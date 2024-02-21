// 策略模式： 定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。


// 询价方法，接受价格标签和原价为入参
function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === 'pre') {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  }

  // 处理大促价
  if (tag === 'onSale') {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  }

  // 处理返场价
  if (tag === 'back') {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  }

  // 处理尝鲜价
  if (tag === 'fresh') {
    return originPrice * 0.5;
  }
}

const priceProcessor = {
  pre: function (price) {
    if (price >= 100) {
      return price - 20;
    }
    return price * 0.9;
  },
  onSale: function (price) {
    if (price >= 100) {
      return price - 30;
    }
    return price * 0.8;
  },
  back: function (price) {
    if (price >= 200) {
      return price - 50;
    }
    return price;
  },
  fresh: function (price) {
    return price * 0.5;
  },
};

function askPrices(tag, originPrice) {
  return priceProcessor[tag](originPrice);
}

// 新增用户优惠策略
priceProcessor.newUser = function(price) {
  return price * 0.85;
}