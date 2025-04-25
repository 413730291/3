let colorChangeInterval = 30; // 每30幀變換一次顏色
let frameCounter = 0;
let currentColor;
let inputElement;
let txts = "Hello"; // 初始文字
let slider; // 滑桿物件
let sliderLabel; // 滑桿標籤
let button; // 按鈕物件
let isBouncing = false; // 是否跳動
let dropdown; // 下拉式選單
let iframe; // iframe 物件

function setup() { 
  // 產生一個畫布，充滿整個視窗，背景顏色為淺色
  createCanvas(windowWidth, windowHeight);
  background(240, 240, 240); // 淺色背景
  currentColor = color(random(255), random(255), random(255));

  // 產生一個輸入框，內容為 "Hello"，位置在 (50, 50)
  inputElement = createInput("Hello");
  inputElement.position(50, 50);
  inputElement.size(200, 50); // 調整文字框大小
  inputElement.style('font-size', '24px'); // 調整輸入框內文字大小
  inputElement.style('font-weight', 'bold'); // 調整輸入框內文字粗度
  inputElement.style('border', '2px solid #ff69b4'); // 調整輸入框邊框
  inputElement.style('border-radius', '12px'); // 調整輸入框圓角
  inputElement.style('padding', '10px'); // 調整輸入框內邊距
  inputElement.input(updateText); // 當輸入框內容改變時，呼叫 updateText 函數

  // 產生一個標籤，顯示 "文字大小"
  sliderLabel = createDiv('文字大小');
  sliderLabel.position(300, 50); // 調整標籤位置，往右移一點
  sliderLabel.style('font-size', '24px'); // 調整標籤文字大小
  sliderLabel.style('font-weight', 'bold'); // 設定標籤文字為粗體

  // 產生一個滑桿，位置在 (400, 50)，寬度為 100
  slider = createSlider(12, 50, 24); // 調整滑桿範圍為 12 到 50
  slider.position(400, 50);
  slider.style('width', '200px'); // 調整滑桿寬度
  slider.style('height', '20px'); // 調整滑桿高度
  slider.style('background', '#ff69b4'); // 調整滑桿背景顏色
  slider.style('border-radius', '12px'); // 調整滑桿圓角

  // 產生一個按鈕，顯示 "跳動"
  button = createButton('跳動');
  button.position(620, 50);
  button.style('font-size', '24px'); // 調整按鈕文字大小
  button.style('padding', '10px 20px'); // 調整按鈕內邊距
  button.style('background-color', '#ff69b4'); // 調整按鈕背景顏色
  button.style('border', 'none'); // 移除按鈕邊框
  button.style('border-radius', '12px'); // 調整按鈕圓角
  button.style('color', 'white'); // 調整按鈕文字顏色
  button.style('cursor', 'pointer'); // 調整按鈕游標樣式
  button.mousePressed(toggleBounce); // 當按鈕被按下時，呼叫 toggleBounce 函數

  // 產生一個下拉式選單，位置在 (800, 50)，寬度為 100
  dropdown = createSelect();
  dropdown.position(800, 50);
  dropdown.size(150, 50); // 調整下拉式選單大小
  dropdown.style('font-size', '24px'); // 調整下拉式選單文字大小
  dropdown.style('border', '2px solid #ff69b4'); // 調整下拉式選單邊框
  dropdown.style('border-radius', '12px'); // 調整下拉式選單圓角
  dropdown.style('padding', '10px'); // 調整下拉式選單內邊距
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('教學平台');
  dropdown.changed(goToLink);

  // 產生一個 iframe，位置在視窗中間
  iframe = createElement('iframe');
  iframe.position(10, 100);
  iframe.size(windowWidth - 20, windowHeight - 150);
}

function updateText() {
  txts = inputElement.value(); // 更新顯示的文字
}

function toggleBounce() {
  isBouncing = !isBouncing; // 切換跳動狀態
}

function goToLink() {
  let item = dropdown.value();
  if (item === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (item === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (item === '教學平台') {
    iframe.attribute('src', 'https://hackmd.io/@chi10199/SJD4wW-21g');
  }
}

function draw() {
  background(240, 240, 240); // 每次重繪背景，避免文字重疊
  let textSizeValue = slider.value(); // 取得滑桿的值
  textSize(textSizeValue); // 調整文字大小
  textStyle(BOLD); // 設定文字為粗體

  // 調整輸入框內文字的大小和粗度
  inputElement.style('font-size', textSizeValue + 'px');
  inputElement.style('font-weight', 'bold');

  let x = 0;
  let y = 0;

  while (y < windowHeight) {
    while (x < windowWidth) {
      let bounceOffset = isBouncing ? sin(frameCounter * 0.1 + x * 0.05) * 5 : 0;
      text(txts, x, y + bounceOffset);
      x += textWidth(txts) + 20; // 增加文字之間的間隔
    }
    y += textAscent() + textDescent() + 20; // 增加行之間的間隔
    x = 0;
  }

  if (frameCounter % colorChangeInterval == 0) {
    currentColor = color(random(255), random(255), random(255));
  }
  frameCounter++;

  fill(currentColor);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 150); // 調整 iframe 大小
}