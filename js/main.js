// 엄격한 모드
"use strict";

// DOM을 head 태그에 넣게 되면 body에 있는 녀석들을 사용할 수 없음
// 그래서 문서가 로드 된 다음에 이벤트를 걸겠다고 작성

document.addEventListener("DOMContentLoaded", () => {
  const searchEl = document.querySelector(".search");
  // 검색 버튼을 감싸고 있는 search를 찾음
  const searchInputEl = searchEl.querySelector("input");
  // search 안에 input 을 찾음

  // 검색창 요소를 클릭시 실행할 이벤트 작성
  searchEl.addEventListener("click", () => {
    searchInputEl.focus();
  });

  // 검색창 요소 내부 input 요소에 포커스되면 실행될 이벤트 작성
  searchInputEl.addEventListener("focus", () => {
    searchEl.classList.add("focused");
    // focused라는 클래스를 추가한다.
    searchInputEl.setAttribute("placeholder", "통합검색");
    // placeholder 라는 속성을 지정 값으로는 '통합검색'
  });

  // 검색창 요소 내부 input 요소에서 focus가 해제(blur)되면 실행될 이벤트 작성
  searchInputEl.addEventListener("blur", () => {
    searchEl.classList.remove("focused");
    // focused라는 클래스를 다시 빼준다.
    searchInputEl.setAttribute("placeholder", "");
    // placeholder라는 속성을 지정 값은 '빈' 값
  });

  /*
    페이지 스크롤에 따른 요소 제어
    _.throttle(함수, 시간)
    window.scrollY 라고 작성하면 스크롤 내릴 때 몇px에 위치해
    있는지 알 수 있음
    gsap 는 자바스크립트에서 animation 요소를 사용하게함
    gsap.to(요소, 지속시간(일반시간), 옵션(어떻게 처리할지));
  */

  // .badge 찾기
  const badgeEl = document.querySelector("header .badgeCover");

  // window 창에 이벤트 걸기 lodash
  window.addEventListener(
    "scroll",
    _.throttle(() => {
      // 화면 스크롤이 500을 넘기면 badge를 숨기기
      if (window.scrollY > 500) {
        // animation 처리
        gsap.to(badgeEl, 0.6, {
          opacity: 0,
          display: "none",
        });
      } else {
        gsap.to(badgeEl, 0.6, {
          opacity: 1,
          display: "block",
        });
      }
    }, 300)
  ); // 0.3초마다 실행되게 제한을 걺

  // visual 부분 순서대로 나타나게
  // .fadeIn 찾기
  /*
    순차적으로 출력하기 위해 
    gsap에서 제공하는 delay라는 옵션을 사용해 
    순차적으로 실행되게 만듬
    0.7초마다 실행하게 하고싶은데 그냥 써버리면 
    모든게 0.7초마다 실행되니까 index를 사용해서 
    순차적으로 실행하게 함
  */
  const fadeEls = document.querySelectorAll(".visual .fadeIn");
  // forEach를 사용해 하나씩 처리
  fadeEls.forEach((fadeEl, index) => {
    gsap.to(fadeEl, 1, {
      delay: (index + 1) * 0.7, // 0.7, 1.4, 2.1, 2.8
      opacity: 1,
    });
  });

  /*
    new Swiper(선택자, 옵션)
    direction: vertical // 수직슬라이드
    direction: horizontal // 수평슬라이드 default
    
  */

  // swiper() 사용
  new Swiper(".noticeLine .swiper-container", {
    direction: "vertical", // 클릭해서 위로 올려보면 다음꺼가 나옴
    autoplay: true, // 자동 슬라이드
    loop: true, // 반복 재생
  });

  new Swiper(".promotion .swiper-container", {
    autoplay: {
      delay: 3000,
    },
    loop: true,
    slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데
    pagination: {
      // 페이지 번호 사용
      el: ".promotion .swiper-pagination", // 페이지 번호 요소 선택자
      clickable: true, // 사용자가 페이지 번호 요소 제어 가능
    },
    navigation: {
      // next, prev 버튼 사용 여부
      prevEl: ".promotion .swiper-prev", // 이전 버튼
      nextEl: ".promotion .swiper-next", // 다음 버튼
    },
  });

  // promotion 슬라이드 토글
  // 영역 요소 검색
  const promotionEl = document.querySelector(".promotion");
  // 토글버튼 검색
  const promoctionToggleBtn = document.querySelector(".toggle-promotion");
  // 숨김 여부
  let isHidePromotion = true;

  // 토글버튼 클릭 시 이벤트
  promoctionToggleBtn.addEventListener("click", () => {
    // 클릭하면 숨김 여부의 반대의 값을 할당
    isHidePromotion = !isHidePromotion;

    // 숨겨야 하면
    if (isHidePromotion) {
      promotionEl.classList.add("hide"); // 영역 요소에 hide 클래스 추가
      // 보여야 하면
      promoctionToggleBtn.classList.remove("open");
    } else {
      promotionEl.classList.remove("hide");
      promoctionToggleBtn.classList.add("open");
    }
  });

  /*
    요소가 화면에 보여짐 여부에 따른 요소 관리
    .Scene() 감시할 장면(Scene)을 추가

    .setClassToggle() 요소가 화면에 보이면 show 클래스 추가
    .addTo() 컨트롤러에 장면을 할당(필수)
  */
  // 관리할 요소 검색
  const spyEls = document.querySelectorAll("section.scroll-spy");
  // 요소 반복 처리
  spyEls.forEach((spyEl) => {
    new ScrollMagic.Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: 0.8, // 화면의 80% 지점에서 보여짐 여부 감시
    })
      .setClassToggle(spyEl, "show")
      .addTo(new ScrollMagic.Controller());
  });

  // 올해년도 구하기
  // 년도를  넣을 요소 검색
  const thisYear = document.querySelector(".this-year");
  thisYear.textContent = new Date().getFullYear();
});
