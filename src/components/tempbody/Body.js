
import { useState } from 'react';
export default function TempBody() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
    // 검색 로직 구현
        console.log('검색 실행:', searchQuery);
    };

    return (
        <div>
            <div className="sidebar">

                <div className="search-container">
                    <div className="search-input" style={{ backgroundColor: "#f2f2f2" }}>
                        <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className ="search-button">
                    <input type="image" src="/public/img/search_RG.jpg" alt = 'ss' onClick={handleSearch}/>
                    </div>
                        

                
                </div>
                <p>사이드바</p>
            </div>

            <div class="main-content">
                <div style={{ border: "solid 1px black"}}>
                    <p>여기는 임시로 만든 바디 영역입니다.</p>
                    <p>필요없고 보여주기 식입니다....</p>
                </div>
            </div>
        </div>
    );
}
