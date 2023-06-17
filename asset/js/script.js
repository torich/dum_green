let navbtn = document.getElementById('navbtn');
let timer = false;
let prewidth = 0;
window.onload = () => {
    prewidth = window.innerWidth;
    const header = document.getElementById('header');
    const scrollObj = document.querySelectorAll('.scroll-obj');
    const fv = document.getElementById('fv');

    // loadingを非表示にする
    const spinner = document.getElementById('loading');
    spinner.setAttribute('aria-hidden', true);
    scrollObj.forEach((obj) => {
        obj.classList.add('logo-border');
    });

    let flg = window.location.href.lastIndexOf('#') > -1;

    // スクロール位置をリセットする
    // if (!flg) {
        const resetScroll = () => {
            if( window.scrollY !== 0 ){
                window.scroll(0,0);
                clearTimeout(resetScroll);
            }
        };
        setTimeout(resetScroll, 0);
    // }
    if (window.innerWidth > 1005) {
        navbtn.nextElementSibling.querySelector('.l-header__navmenu').setAttribute('aria-hidden', false);
    } else {
        navbtn.nextElementSibling.querySelector('.l-header__navmenu').setAttribute('aria-hidden', true);

    }
    if (flg) {
        initial();
        return;
    }

    // let ticking = flg ? true: false;
    let ticking = false;
    console.log(ticking);
    document.addEventListener('scroll', (event) => {

        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY) {
                    initial();
                }
            });
        }
        ticking = true;
    });
    function initial() {
        // headerを固定する
        header.classList.add('scrolled');
        // scrollObjの要素を非表示にする
        scrollObj.forEach((obj) => {
            obj.setAttribute('aria-hidden', true);
        });
        fv.classList.add('scrolled');
        window.scroll(0, 1);
        document.querySelector('.p-top__image').style.position = 'absolute';
    }
}
navbtn.addEventListener('click', (event) => {
    let target = event.target.nextElementSibling.querySelector('.l-header__navmenu');
    let state = JSON.parse(target.getAttribute('aria-hidden'));
    var result = new Promise(resolve => {
        resolve(state);
    });
    result
        .then(state => {
            target.setAttribute('aria-hidden', !(state));
            return !(state);
        })
        .then(flg => {
            return new Promise(resolve => {
                if (flg === true) {
                    setTimeout(() => { 
                        document.getElementById('navContainer').classList.remove('open');
                        document.getElementById('navContainer').classList.add('close');
                    }, 600);
                } else {
                    setTimeout(() => {
                        document.getElementById('navContainer').classList.remove('close');
                        document.getElementById('navContainer').classList.add('open');
                    }, 0);
                }
            });
        });

});
window.onresize = () => {

    // if (timer !== false) {
    //     clearTimeout(timer);
    // }
    // timer = setTimeout(() => {
    //     let nowWidth = window.innerWidth;
    //     if (prewidth !== nowWidth) {
    //         location.reload();
    //     }
    //     prewidth = nowWidth;
    // }, 200);
};