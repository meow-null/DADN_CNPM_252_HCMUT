import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { prisma } from "../src/common/prisma/connect.prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readCSV = (fileName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, "data", fileName);
    
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

  // 1. Material Grades
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

  // 2. Standard Tables (Modules, Center Distances, Shaft Diameters, Key Lengths)
  const standardTables = [
    { file: "standard_modules.csv", model: prisma.standard_modules, label: "standard_modules" },
    { file: "standard_center_distances.csv", model: prisma.standard_center_distances, label: "standard_center_distances" },
    { file: "standard_shaft_diameters.csv", model: prisma.standard_shaft_diameters, label: "standard_shaft_diameters" },
    { file: "standard_key_lengths.csv", model: prisma.standard_key_lengths, label: "standard_key_lengths" }
  ];

  for (const table of standardTables) {
    const rows = await readCSV(table.file);
    if (rows.length > 0) {
      await table.model.createMany({
        data: rows.map((row) => ({ value: parseFloat(row.value) })),
        skipDuplicates: true,
      });
      console.log(`✅ Đã import ${table.label}`);
    }
  }

  // 3. Key Dimensions
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

  // 4. Chains (Bổ sung P_allow cho UC05)
  const chainsData = await readCSV("chain_params.csv");
  for (const row of chainsData) {
    await prisma.chains.upsert({
      where: { pitch: parseFloat(row.pitch || row.p_mm) },
      update: {
        P_allow: parseFloat(row.P_allow) || null // Cập nhật nếu file CSV có cột này
      },
      create: {
        pitch: parseFloat(row.pitch || row.p_mm),
        P_allow: parseFloat(row.P_allow) || null,
        breaking_load: parseFloat(row.breaking_load || row.Q_kN),
        mass_per_m: parseFloat(row.mass_per_m || row.q_kgm),
        A_mm2: parseFloat(row.A_mm2),
        s_allow: parseFloat(row.s_allow),
        n_ref: parseInt(row.n_ref),
      },
    });
  }
  if (chainsData.length > 0) console.log("✅ Đã import chains");

  // 5. Bearings
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

  // 6. Motors
  const motorFiles = [
    { fileName: "P1.1 - Mẫu K.csv", series: "K" },
    { fileName: "P1.2 - Mẫu DK.csv", series: "DK" },
    { fileName: "P1.3 - Mẫu 4A.csv", series: "4A" }
  ];
  for (const file of motorFiles) {
    const data = await readCSV(file.fileName);
    for (const row of data) {
      if (!row.model_code) continue;
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
        }
      });
    }
  }
  console.log("✅ Đã import motors");

  // 7. NEW: Shaft Allowable Stress (Từ Bảng 10.5)
  const shaftStressData = await readCSV("shaft_allowable_stress.csv");
  if (shaftStressData.length > 0) {
    await prisma.shaft_allowable_stress.createMany({
      data: shaftStressData.map(row => ({
        d_range_min: parseFloat(row.d_range_min),
        d_range_max: parseFloat(row.d_range_max),
        sigma_b: parseFloat(row.sigma_b),
        sigma_allow: parseFloat(row.sigma_allow)
      })),
      skipDuplicates: true
    });
    console.log("✅ Đã import shaft_allowable_stress (Bảng 10.5)");
  }

// 8. Import Fatigue Coefficients
const fatigueData = await readCSV("Kx_Ksigma_coefficients.csv"); // Đảm bảo tên file khớp với thực tế
if (fatigueData.length > 0) {
  // Gọi chính xác tên model kx_ksigma_coefficients
  await prisma.kx_ksigma_coefficients.createMany({
    data: fatigueData.map(row => ({
      fit_type: row.fit_type,
      d_range_min: parseFloat(row.d_range_min),
      d_range_max: parseFloat(row.d_range_max),
      K_sigma: parseFloat(row.K_sigma),
      eps_sigma: parseFloat(row.eps_sigma),
      beta_sigma: parseFloat(row.beta_sigma)
    })),
    skipDuplicates: true
  });
  console.log("✅ Đã import kx_ksigma_coefficients (Kiểm nghiệm mỏi)");
}

  console.log("\n🎉 HOÀN TẤT IMPORT TOÀN BỘ DỮ LIỆU!");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi import:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });