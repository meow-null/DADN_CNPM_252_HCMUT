import { useState, useEffect } from 'react';
import { formatNumber } from '../utils/formatUtils';
import ReactMarkdown from 'react-markdown';

export default function Reports({ onNavigate, activeProject, kinematicsResult }) {
  // Quản lý trạng thái bật/tắt của Modal Preview PDF
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const kinematics = kinematicsResult?.kinematics;

  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchPreview = async () => {
      if (hasGenerated) return;
      setIsGenerating(true);
      try {
        const response = await fetch(`http://localhost:3069/api/projects/${activeProject.id}/report/preview`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (isMounted) {
          if (data.status === 'success') {
            setMarkdownContent(data.data.markdown);
            setHasGenerated(true);
          } else {
            alert("Lỗi tạo báo cáo: " + data.message);
          }
        }
      } catch (err) {
        if (isMounted) {
          alert("Lỗi kết nối khi tạo báo cáo.");
        }
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    };

    if (activeProject?.id && !hasGenerated) {
      fetchPreview();
    }

    return () => { isMounted = false; };
  }, [activeProject?.id, hasGenerated]);

  const handleGeneratePreview = () => {
    setShowPreviewModal(true);
  };

  const handleExport = async (type) => {
    if (!markdownContent) {
      alert("Vui lòng xem trước để hệ thống AI sinh báo cáo trước khi xuất file!");
      return;
    }
    setIsExporting(true);
    try {
      const url = `http://localhost:3069/api/projects/${activeProject.id}/report/${type}`;
      
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ markdown: markdownContent })
      });
      
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `Thuyet-Minh-Ky-Thuat.${type === 'word' ? 'docx' : 'pdf'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert(`Lỗi xuất file ${type.toUpperCase()}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="space-y-10 animate-fade-in relative">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => onNavigate('summary')}
            className="mb-4 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-500 font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors w-fit shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Quay lại Tổng kết
          </button>
          <h2 className="text-3xl font-bold text-slate-900">Tổng kết Dự án & Xuất báo cáo</h2>
          <p className="text-slate-500">Tóm tắt các thông số chính đã tính toán và xuất báo cáo thuyết minh kỹ thuật.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase font-bold tracking-widest">
            <tr><th className="px-8 py-5">Thông số</th><th className="px-8 py-5">Ký hiệu</th><th className="px-8 py-5">Đơn vị</th><th className="px-8 py-5 text-right">Giá trị</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="px-8 py-5 font-medium">Công suất</td><td className="px-8 py-5 text-slate-400 font-mono">P</td><td className="px-8 py-5 text-slate-400">kW</td><td className="px-8 py-5 text-right font-bold text-primary text-lg">{formatNumber(activeProject?.input_P) ?? '-'}</td></tr>
            <tr><td className="px-8 py-5 font-medium">Số vòng quay</td><td className="px-8 py-5 text-slate-400 font-mono">n</td><td className="px-8 py-5 text-slate-400">vòng/phút</td><td className="px-8 py-5 text-right font-bold text-primary text-lg">{formatNumber(activeProject?.input_n_ct) ?? '-'}</td></tr>
            <tr><td className="px-8 py-5 font-medium">Tỷ số truyền</td><td className="px-8 py-5 text-slate-400 font-mono">u</td><td className="px-8 py-5 text-slate-400">-</td><td className="px-8 py-5 text-right font-bold text-primary text-lg">{formatNumber(kinematics?.u_ch_sb) ?? '-'}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">Tùy chọn Xuất Báo cáo</h3>
        <button onClick={handleGeneratePreview} disabled={isGenerating} className="w-full py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mb-6">
          {isGenerating ? 'Đang chờ AI...' : 'Xem trước'}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => handleExport('pdf')} 
            disabled={isExporting}
            className="block text-left w-full p-6 bg-slate-50 border-2 border-slate-100 hover:border-red-400 hover:bg-red-50 rounded-2xl cursor-pointer transition-all disabled:opacity-50 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 font-bold group-hover:scale-110 transition-transform">PDF</div>
              <div><p className="font-bold text-slate-800">Xuất File PDF</p><p className="text-xs text-slate-400">Định dạng chuẩn để in ấn & lưu trữ</p></div>
            </div>
          </button>
          <button 
            onClick={() => handleExport('word')} 
            disabled={isExporting}
            className="block text-left w-full p-6 bg-slate-50 border-2 border-slate-100 hover:border-blue-400 hover:bg-blue-50 rounded-2xl cursor-pointer transition-all disabled:opacity-50 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold group-hover:scale-110 transition-transform">DOCX</div>
              <div><p className="font-bold text-slate-800">Xuất File Word</p><p className="text-xs text-slate-400">Dễ dàng chỉnh sửa nội dung</p></div>
            </div>
          </button>
        </div>
      </div>

      {/* MODAL PREVIEW PDF */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#e2e8f0] rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-fade-in">
            <div className="bg-white p-4 flex items-center justify-between border-b border-slate-200">
              <span className="font-bold text-slate-700">Preview: Thuyet-Minh-Ky-Thuat.pdf</span>
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors" onClick={() => setShowPreviewModal(false)}>Đóng [X]</button>
            </div>
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              <div className="bg-white w-full max-w-[800px] mx-auto shadow-lg min-h-[1000px] p-20 flex flex-col prose prose-slate max-w-none h-fit">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 py-20 text-slate-500">
                    <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="animate-pulse">AI đang tổng hợp và viết báo cáo...</p>
                  </div>
                ) : (
                  <ReactMarkdown>{markdownContent}</ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}