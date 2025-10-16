// 图酷三年之约证书浮窗JavaScript
// 证书ID: 11

// 使用JSONP加载证书数据
var script = document.createElement('script');
var callbackName = 'certificateCallback_' + Date.now();
window[callbackName] = function(data) {
    window.tucool_seal_data=data;
};
script.src = '//three.tucool.cn/wp-content/plugins/tucool-three-year-pledge/includes/certificate-jsonp.php?cert_id=11&is_jsonp=1&callback=' + callbackName;
document.head.appendChild(script);

// 日期格式化函数
function formatDate(dateStr) {
    var date = new Date(dateStr);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}

// 计算到期日期
function getExpiryDate(dateStr) {
    var date = new Date(dateStr);
    date.setFullYear(date.getFullYear() + 3);
    return formatDate(date);
}

// 计算已签约时间
function getSignedTime(dateStr) {
    var startDate = new Date(dateStr);
    var now = new Date();
    
    // 如果当前时间早于开始时间，显示0
    if (now < startDate) {
        return '<span style="color:#666;">0天</span>';
    }
    
    var diff = now.getTime() - startDate.getTime();
    
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var years = Math.floor(days / 365);
    var remainingDays = days % 365;
    var months = Math.floor(remainingDays / 30);
    remainingDays = remainingDays % 30;
    
    var result = '';
    if (years > 0) result += years + '年';
    if (months > 0) result += months + '个月';
    if (remainingDays > 0) result += remainingDays + '天';
    
    // 如果所有值都为0，显示0天
    if (result === '') result = '0天';
    
    return '<span style="color:#28a745;">' + result + '</span>';
}

// 创建证书预览浮窗
function createCertificatePreview() {
    if (document.getElementById('certificate-preview')) {
        return; // 已存在，无需重复创建
    }
    
    var previewDiv = document.createElement('div');
    previewDiv.id = 'certificate-preview';
    previewDiv.style.cssText = 'display:none;position:absolute;background:#fff;border:2px solid #ddd;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.3);z-index:9999;max-width:400px;max-height:600px;overflow:auto;';
    
    var contentDiv = document.createElement('div');
    contentDiv.id = 'certificate-content';
    contentDiv.style.cssText = 'padding:20px;text-align:center;';
    
    previewDiv.appendChild(contentDiv);
    document.body.appendChild(previewDiv);
}

// 显示证书预览
function showCertificatePreview(certId) {
    createCertificatePreview(); // 确保浮窗已创建
    
    var preview = document.getElementById('certificate-preview');
    var content = document.getElementById('certificate-content');
    
    if (!preview || !content) return;
    
    // 获取徽章图标元素
    var badgeImg = document.querySelector('#tuc-badge-link img');
    if (!badgeImg) {
        console.error('未找到徽章图标元素');
        return;
    }
    
    // 获取图标的位置和尺寸
    var imgRect = badgeImg.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // 计算浮窗位置
    var imgCenterX = imgRect.left + scrollLeft + (imgRect.width / 2);
    var imgTop = imgRect.top + scrollTop;
    
    // 设置浮窗内容并显示以获取尺寸
    content.innerHTML = '<div style="text-align:center;padding:20px;">加载中...</div>';
    preview.style.display = 'block';
    preview.style.visibility = 'hidden'; // 临时隐藏以获取尺寸
    
    // 获取浮窗尺寸
    var previewRect = preview.getBoundingClientRect();
    var previewWidth = previewRect.width;
    var previewHeight = previewRect.height;
    
    // 计算最终位置
    var left = imgCenterX - (previewWidth / 2);
    var top = imgTop - previewHeight;
    
    // 确保浮窗不超出屏幕边界
    var minLeft = 10;
    var maxLeft = window.innerWidth - previewWidth - 10;
    left = Math.max(minLeft, Math.min(left, maxLeft));
    
    // 如果浮窗顶部超出屏幕，则显示在图标下方
    if (top < 10) {
        top = imgRect.bottom + scrollTop + 5;
    }
    
    // 应用最终位置
    preview.style.left = left - 100 + 'px';
    preview.style.top = top - 450 + 'px';
    preview.style.visibility = 'visible';
    
    
    if (window.tucool_seal_data.success) {
        var cert = window.tucool_seal_data.data;
        content.innerHTML = '\
            <div style="background:linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%);color:#fff;padding:30px;border-radius:8px;margin-bottom:20px;text-align:center;">\
                <h2 style="margin:0 0 10px 0;font-size:24px;font-weight:bold;">图酷三年之约证书</h2>\
                <p style="margin:0;font-size:14px;opacity:0.9;">Certificate of Three-Year Commitment</p>\
            </div>\
            <div style="padding:20px;text-align:left;">\
                <div style="margin-bottom:15px;"><strong>网站名称：</strong>' + cert.site_name + '</div>\
                <div style="margin-bottom:15px;"><strong>网站地址：</strong><a href="' + cert.site_url + '" target="_blank" style="color:#667eea;text-decoration:none;">' + cert.site_url + '</a></div>\
                <div style="margin-bottom:15px;"><strong>证书编号：</strong>' + cert.certificate_number + '</div>\
                <div style="margin-bottom:15px;"><strong>颁发日期：</strong>' + formatDate(cert.created_at) + '</div>\
                <div style="margin-bottom:15px;"><strong>到期日期：</strong>' + getExpiryDate(cert.created_at) + '</div>\
                <div style="margin-bottom:15px;"><strong>已签约：</strong><span id="signed-time">' + getSignedTime(cert.created_at) + '</span></div>\
                <div style="margin-bottom:15px;"><strong>审核状态：</strong><span style="color:#28a745;font-weight:bold;">已通过</span></div>\
            </div>\
            <div style="text-align:center;padding:20px;border-top:1px solid #eee;">\
                <p style="margin:0;color:#666;font-size:12px;">此证书证明该网站已加入图酷三年之约计划</p>\
                <p style="margin:5px 0 0 0;color:#666;font-size:12px;">承诺网站将持续运营至少三年</p>\
            </div>\
        ';
    } else {
        content.innerHTML = '<div style="text-align:center;padding:20px;color:#dc3545;">加载失败：' + (data.message || '未知错误') + '</div>';
    }
    
    // 清理回调函数和script标签
    delete window[callbackName];
    document.head.removeChild(script);
    
    script.src = '//three.tucool.cn/wp-content/plugins/tucool-three-year-pledge/includes/certificate-jsonp.php?cert_id=' + certId + '&is_jsonp=1&callback=' + callbackName;
    document.head.appendChild(script);
}

// 隐藏证书预览
function hideCertificatePreview() {
    var preview = document.getElementById('certificate-preview');
    if (preview) {
        preview.style.display = 'none';
    }
}

// 点击浮窗外部区域关闭
document.addEventListener('click', function(e) {
    var preview = document.getElementById('certificate-preview');
    if (preview && preview.style.display === 'block') {
        if (e.target === preview) {
            hideCertificatePreview();
        }
    }
});

// ESC键关闭浮窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideCertificatePreview();
    }
});