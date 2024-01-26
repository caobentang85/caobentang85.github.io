function download_link() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // 检测苹果手机或者苹果系统电脑
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // 是苹果手机或者苹果系统电脑，跳转到 a.html
        window.location.href = 'https://apps.apple.com/cn/app/fis-ftpl/id6475953590';
    } else if (/Macintosh/.test(userAgent) && navigator.platform.indexOf('Mac') > -1) {
        // 是苹果系统电脑，跳转到 a.html
        window.location.href = 'https://apps.apple.com/cn/app/fis-ftpl/id6475953590';
    }
    // 检测Windows系统或安卓手机
    else if (/Windows/.test(userAgent)) {
        // 是Windows系统，跳转到 b.html
        window.location.href = 'https://play.google.com/store/apps/details?id=com.FIS.FTPL.PROOK.net';
    } else if (/android/i.test(userAgent)) {
        // 是安卓手机，跳转到 b.html
        window.location.href = 'https://play.google.com/store/apps/details?id=com.FIS.FTPL.PROOK.net';
    }
    // 其他情况，跳转到零页
    else {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.FIS.FTPL.PROOK.net';
    }
}