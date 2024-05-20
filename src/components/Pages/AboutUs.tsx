import React from 'react';

const Aboutus = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <div className="mb-4">
        <span className="block font-semibold">Frontend:</span>
        <span className="font-serif">이예찬, 신건우</span>
      </div>
      <div className="mb-4">
        <span className="block font-semibold">Backend:</span>
        <span className="font-serif">한상진, 정지원, 노명은, Siti</span>
      </div>
      <div className="mb-8">
        <span className="block font-semibold">Goal:</span>
        <span className="font-serif">
          회원 등록이나 계정 생성 과정 없이, 파일을 손쉽게 공유할 수 있는 빠르고 간편한 방법을 제공한다. 
          공유공간에 접근할 수 있도록 하는 고유한 링크를 통해 사용자가 간편하게 공유공간에 접속할 수 있도록 한다. 
          특정 사용자만이 공유공간에 접속할 수 있도록, 공유공간에 비밀번호를 설정하는 기능을 지원한다. 
          공유공간은 일정 기간 동안만 액세스 가능하며, 이를 통해 사용자들은 장기간 보관이나 무단 액세스에 대한 걱정 없이도 민감한 정보를 안전하게 공유할 수 있다.
        </span>
      </div>
    </div>
  );
};

export default Aboutus;
