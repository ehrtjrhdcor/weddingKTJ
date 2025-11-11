// 현재 이미지 인덱스
let currentImageIndex = 0;
const totalImages = 6;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();
    initScrollAnimation();
});

// 스크롤 애니메이션
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// 이미지 갤러리 모달
function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    // 실제 이미지가 있다면 src를 변경하세요
    // modalImg.src = `images/photo${index + 1}.jpg`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 1;
    } else if (currentImageIndex >= totalImages) {
        currentImageIndex = 0;
    }

    const modalImg = document.getElementById('modalImage');
    // modalImg.src = `images/photo${currentImageIndex + 1}.jpg`;
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 지도 앱 열기
function openKakaoMap() {
    // 실제 장소 좌표로 변경하세요
    const placeName = '예식장 이름';
    const url = `https://map.kakao.com/link/search/${encodeURIComponent(placeName)}`;
    window.open(url, '_blank');
}

function openNaverMap() {
    // 실제 장소 좌표로 변경하세요
    const placeName = '예식장 이름';
    const url = `https://map.naver.com/v5/search/${encodeURIComponent(placeName)}`;
    window.open(url, '_blank');
}

function openTmap() {
    // 실제 장소 좌표로 변경하세요
    const placeName = '예식장 이름';
    const url = `https://apis.openapi.sk.com/tmap/app/routes?appKey=YOUR_APP_KEY&name=${encodeURIComponent(placeName)}`;
    window.open(url, '_blank');
}

// 계좌번호 복사
function copyAccount(accountNumber) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(accountNumber).then(() => {
            showToast('계좌번호가 복사되었습니다');
        }).catch(err => {
            console.error('복사 실패:', err);
            fallbackCopy(accountNumber);
        });
    } else {
        fallbackCopy(accountNumber);
    }
}

// 구형 브라우저용 복사 함수
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('계좌번호가 복사되었습니다');
    } catch (err) {
        showToast('복사에 실패했습니다');
    }

    document.body.removeChild(textArea);
}

// 방명록 메시지 저장 및 불러오기
function submitMessage() {
    const nameInput = document.getElementById('guestName');
    const messageInput = document.getElementById('guestMessage');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
        showToast('이름을 입력해주세요');
        return;
    }

    if (!message) {
        showToast('메시지를 입력해주세요');
        return;
    }

    const messageData = {
        name: name,
        message: message,
        date: new Date().toISOString()
    };

    // 로컬 스토리지에 저장
    let messages = JSON.parse(localStorage.getItem('weddingMessages') || '[]');
    messages.unshift(messageData);
    localStorage.setItem('weddingMessages', JSON.stringify(messages));

    // 입력 필드 초기화
    nameInput.value = '';
    messageInput.value = '';

    // 메시지 목록 새로고침
    loadMessages();

    showToast('메시지가 등록되었습니다');
}

function loadMessages() {
    const messageList = document.getElementById('messageList');
    const messages = JSON.parse(localStorage.getItem('weddingMessages') || '[]');

    if (messages.length === 0) {
        messageList.innerHTML = '<p style="text-align: center; color: #999;">아직 메시지가 없습니다</p>';
        return;
    }

    messageList.innerHTML = messages.map(msg => {
        const date = new Date(msg.date);
        const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

        return `
            <div class="message-item">
                <div class="message-header">
                    <span class="message-author">${escapeHtml(msg.name)}</span>
                    <span class="message-date">${dateStr}</span>
                </div>
                <div class="message-content">${escapeHtml(msg.message)}</div>
            </div>
        `;
    }).join('');
}

// XSS 방지를 위한 HTML 이스케이프
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 카카오톡 공유
function shareKakao() {
    // 카카오 SDK를 초기화하고 사용하려면 카카오 개발자 앱 키가 필요합니다
    // https://developers.kakao.com/ 에서 앱을 생성하고 JavaScript 키를 받으세요

    if (typeof Kakao === 'undefined') {
        showToast('카카오톡 공유 기능을 준비 중입니다');
        return;
    }

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '우리 결혼합니다',
            description: '소중한 분들을 초대합니다',
            imageUrl: window.location.origin + '/path/to/image.jpg',
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href
            }
        },
        buttons: [
            {
                title: '청첩장 보기',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href
                }
            }
        ]
    });
}

// 페이스북 공유
function shareFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

// URL 복사
function copyURL() {
    const url = window.location.href;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('URL이 복사되었습니다');
        }).catch(err => {
            console.error('복사 실패:', err);
            fallbackCopy(url);
        });
    } else {
        fallbackCopy(url);
    }
}

// 토스트 메시지 표시
function showToast(message) {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 3초 후 제거
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// D-Day 계산 (필요시 사용)
function calculateDday(targetDate) {
    const today = new Date();
    const target = new Date(targetDate);
    const diff = target - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
        return `D-${days}`;
    } else if (days === 0) {
        return 'D-Day';
    } else {
        return `D+${Math.abs(days)}`;
    }
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 모바일 터치 스와이프로 갤러리 이미지 넘기기
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('imageModal').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('imageModal').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeImage(1); // 왼쪽으로 스와이프 - 다음 이미지
    }
    if (touchEndX > touchStartX + 50) {
        changeImage(-1); // 오른쪽으로 스와이프 - 이전 이미지
    }
}

// 이미지 프리로드 (성능 향상)
function preloadImages() {
    for (let i = 1; i <= totalImages; i++) {
        const img = new Image();
        // img.src = `images/photo${i}.jpg`;
    }
}

// 페이지 로드 완료 후 이미지 프리로드
window.addEventListener('load', preloadImages);
