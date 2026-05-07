import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { prisma } from "../src/common/prisma/connect.prisma.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hàm đọc file CSV và parse thành Array Object
const readCSV = (fileName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, "data", fileName);
    
    // Kiểm tra xem file có tồn tại không trước khi đọc
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Bỏ qua: Không tìm thấy file ${fileName}`);
      return resolve([]);
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

async function main() {
  console.log("🚀 Bắt đầu Import dữ liệu từ CSV...");

  // 1. Import material_grades
  const materials = await readCSV("material_grades.csv");
  for (const row of materials) {
    await prisma.material_grades.upsert({
      where: { grade_name: row.grade_name },
      update: {},
      create: {
        grade_name: row.grade_name,
        HB: parseInt(row.HB),
        sigma_b: parseFloat(row.sigma_b),
        sigma_ch: parseFloat(row.sigma_ch),
        sigma_Hlim: parseFloat(row.sigma_Hlim),
        sigma_Flim: parseFloat(row.sigma_Flim),
      },
    });
  }
  if (materials.length > 0) console.log("✅ Đã import material_grades");

  // 2. Import standard_modules
  const modules = await readCSV("standard_modules.csv");
  if (modules.length > 0) {
    await prisma.standard_modules.createMany({
      data: modules.map((row) => ({ value: parseFloat(row.value) })),
      skipDuplicates: true,
    });
    console.log("✅ Đã import standard_modules");
  }

  // 3. Import standard_center_distances
  const centerDistances = await readCSV("standard_center_distances.csv");
  if (centerDistances.length > 0) {
    await prisma.standard_center_distances.createMany({
      data: centerDistances.map((row) => ({ value: parseInt(row.value) })),
      skipDuplicates: true,
    });
    console.log("✅ Đã import standard_center_distances");
  }

  // 4. Import standard_shaft_diameters
  const shaftDiams = await readCSV("standard_shaft_diameters.csv");
  if (shaftDiams.length > 0) {
    await prisma.standard_shaft_diameters.createMany({
      data: shaftDiams.map((row) => ({ value: parseInt(row.value) })),
      skipDuplicates: true,
    });
    console.log("✅ Đã import standard_shaft_diameters");
  }

  // 5. Import standard_key_lengths
  const keyLengths = await readCSV("standard_key_lengths.csv");
  if (keyLengths.length > 0) {
    await prisma.standard_key_lengths.createMany({
      data: keyLengths.map((row) => ({ value: parseInt(row.value) })),
      skipDuplicates: true,
    });
    console.log("✅ Đã import standard_key_lengths");
  }

  // 6. Import key_dimensions
  const keyDims = await readCSV("key_dimensions.csv");
  if (keyDims.length > 0) {
    await prisma.key_dimensions.createMany({
      data: keyDims.map((row) => ({
        d_min: parseInt(row.d_min),
        d_max: parseInt(row.d_max),
        b: parseInt(row.b),
        h: parseInt(row.h),
        t1: parseFloat(row.t1),
        t2: parseFloat(row.t2),
      })),
      skipDuplicates: true,
    });
    console.log("✅ Đã import key_dimensions");
  }

  // 7. Import chains (chain_params.csv)
  const chainsData = await readCSV("chain_params.csv");
  for (const row of chainsData) {
    await prisma.chains.upsert({
      where: { pitch: parseFloat(row.p_mm) },
      update: {},
      create: {
        pitch: parseFloat(row.p_mm),
        breaking_load: parseFloat(row.Q_kN),
        mass_per_m: parseFloat(row.q_kgm),
        A_mm2: parseFloat(row.A_mm2),
        s_allow: parseFloat(row.s_allow),
        n_ref: parseInt(row.n_ref),
      },
    });
  }
  if (chainsData.length > 0) console.log("✅ Đã import chains");

  // 8. Import bearings (bearing_catalog.csv)
  const bearingsData = await readCSV("bearing_catalog.csv");
  for (const row of bearingsData) {
    await prisma.bearings.upsert({
      where: { code: row.code },
      update: {},
      create: {
        code: row.code,
        type: row.type,
        inner_d: parseFloat(row.d),
        outer_D: parseFloat(row.D),
        width_B: parseFloat(row.B),
        C: parseFloat(row.C_kN),
        C0: parseFloat(row.C0_kN),
        e: parseFloat(row.e),
        Y: parseFloat(row.Y),
        alpha_deg: parseFloat(row.alpha_deg),
      },
    });
  }
  if (bearingsData.length > 0) console.log("✅ Đã import bearings");

  // =========================================================================
  // 9. THÊM MỚI: Import dữ liệu Động Cơ Điện (Motors)
  // =========================================================================
  console.log("\n📦 Đang xử lý import dữ liệu Động cơ (Motors)...");
  
  const motorFiles = [
    { fileName: "P1.1 - Mẫu K.csv", series: "K" },
    { fileName: "P1.2 - Mẫu DK.csv", series: "DK" },
    { fileName: "P1.3 - Mẫu 4A.csv", series: "4A" }
  ];

  for (const file of motorFiles) {
    const data = await readCSV(file.fileName);
    if (data.length === 0) continue;

    console.log(`- Đang import sheet ${file.series} (${data.length} dòng)`);
    
    for (const row of data) {
      if (!row.model_code) continue; // Bỏ qua nếu dòng trống không có mã động cơ

      await prisma.motors.upsert({
        where: { code: row.model_code },
        update: {},
        create: {
          series: file.series,
          code: row.model_code,
          P_dm: parseFloat(row.power_kw) || 0,
          n_dm: parseInt(row.speed_50hz_rpm || row.speed_rpm) || 0, 
          efficiency: parseFloat(row.efficiency_pct) || null,
          cos_phi: parseFloat(row.cos_phi) || null,
          t_start_ratio: parseFloat(row.tk_over_tdn) || null,
          t_max_ratio: parseFloat(row.tmax_over_tdn) || null,
          mass_kg: parseFloat(row.mass_kg) || null,
          is_active: true
        }
      });
    }
  }
  console.log("✅ Đã import toàn bộ dữ liệu Động cơ (Motors)");

  console.log("\n🎉 HOÀN TẤT IMPORT TOÀN BỘ DỮ LIỆU VÀO DATABASE!");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi import:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });