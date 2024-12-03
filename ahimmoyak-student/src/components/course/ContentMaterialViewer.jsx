import {Download, FileText} from "lucide-react";
import React from "react";

const ContentMaterialViewer = () => {


  return (
    <div className="space-y-4">
      {/* 파일 뷰어 */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-gray-400 mr-3"/>
            <div>
              <h3 className="font-medium">실습자료.pdf</h3>
              <span className="text-sm text-gray-500">2.4 MB</span>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2"/>
            다운로드
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentMaterialViewer;