# 太鼓

## AI

- 將音頻轉成 Wave form
- 將成首歌砍開好多份

  - 唔需要 AI 聽完成首歌先 Generate 個譜

- 搵出決定重拍 / 輕拍(面譜)既規律

  - 唔 Prefer 單純根據 Wave form 既 Amplitude / Wavelength / Frequency 決定輕/重拍

- 決定 label

  - 有拍子 / 冇拍子 = 1 / 0
  - 重拍 & 輕拍都屬於「有拍子」, 0 同 1 唔夠用

## 流暢度

- set frame 數(或者 Generate 面譜個陣都要有配合?)

## Useful materials

- https://taiko.bui.pm/

- BAD013
  - 聽到 Adams 話其中一個方法係將 Wave form 變成一張圖交俾 AI 去學
  - 我地要搵出 Wave form & 拍子既規律 / 決定佢地既關係

# Text RPG

## Monster Action

- 選項性 AI (Making decisions) 與 if condition 既分別

  - 當可以 / 要做既選擇太多甚至接近天文數字
  - 人冇辦法用 if condition 去模擬所有情況
  - AI 可以自己處理

- Train AI 去做大量選擇傾向用 Reinforcement learning

  - Player 對戰 Boss 既 Game 傾向同時 build 兩個 AI
  - 一個 AI 扮 Player 做決策
  - 一個 AI 扮 Boss 做決策
  - 互相模擬大量情況

## Action value function & Policy function (未研究 只係聽左 d concept)

- 每個選項都會有 specific 既分數

  - 死左 -2000 分
  - 攻擊成功 +100 分
  - 防禦成功 +50 分
  - 攻擊失敗 -50 分
  - 防禦失敗 -100 分
  - 擊倒敵人 +500 分

- 上面兩個方法分別係
  - 1. 考慮點樣可以拎到最多分數
  - 2. 睇翻最高分數個次做左咩選擇

## Useful materials

- https://github.com/openai/gym
- https://stable-baselines.readthedocs.io/en/master/

# 健身環 (認動作)

## 判斷玩家做既動作屬於邊一種: 用圖片

- Classification

## 判斷玩家做既動作有幾似標準動作: 用 PoseNet

- 利用影像 Generate 點點
- 再同標準動作既點點做對比就可以知相似度

## 即時對戰(鬥高分)用 WebRTC

- Delay 更細

## Useful materials

- https://blog.tensorflow.org/2018/05/real-time-human-pose-estimation-in.html
