const ctx = document.getElementById('radarChart').getContext('2d');

// 初期データ
let dataValues = [5, 5, 5, 5, 5];

const radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['審神者Lv', '上位6振', '宝物断片', '極カンスト', '出陣数'],
        datasets: [{
            label: '評価',
            data: dataValues,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'red',
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 10,
                ticks: {
                    stepSize: 1,
                    font: {
                        size: 12  // 目盛りの数字のフォントサイズ
                    }
                },
                pointLabels: {
                    color: '#3c3c3c',
                    font: {
                        size: 14  // 軸のラベル（項目名）のフォントサイズ
                    }
                }
            }
        }
    }
});

// 成績の判定関数
function getGrade(total) {
    if (total <= 5) return "人間";
    if (total <= 20) return "一般ゴリラ";
    if (total <= 30) return "中堅ゴリラ";
    if (total <= 49) return "深淵ゴリラ";
    return "奈落ゴリラ";
}

// 入力値が変更されたらグラフとスコアを更新
function updateChart() {
    dataValues[0] = parseInt(document.getElementById('scoreA').value) || 0;
    dataValues[1] = parseInt(document.getElementById('scoreB').value) || 0;
    dataValues[2] = parseInt(document.getElementById('scoreC').value) || 0;
    dataValues[3] = parseInt(document.getElementById('scoreD').value) || 0;
    dataValues[4] = parseInt(document.getElementById('scoreE').value) || 0;

    radarChart.data.datasets[0].data = dataValues;
    radarChart.update();

    // 合計点を計算
    let totalScore = dataValues.reduce((a, b) => a + b, 0);

    // 数字部分のデザイン変更
    let scoreValueElement = document.getElementById("scoreValue");
    scoreValueElement.innerText = totalScore;

    // 成績のテキスト更新
    let gradeElement = document.getElementById("grade");
    gradeElement.innerText = `あなたは… ${getGrade(totalScore)}`;
}

// 入力変更イベントを登録
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateChart);
});

document.getElementById("calculationType").addEventListener("change", function() {
    let selectedOption = this.value; // 選択された項目を取得

    let descriptionTexts = {
        "A": "50Lvごとに1点",
        "B": "6振ごとに1点",
        "C": "45断片ごとに1点(宝物作成済の場合は×9で断片数を計算)",
        "D": "5.5億ごとに1点(極大太刀×6振り分のカンスト値÷10)",
        "E": "5万戦ごとに1点"
    };

    // 説明文を変更
    document.getElementById("description").innerText = descriptionTexts[selectedOption];
});


function calculate() {
    // 選択された項目の値を取得
    let selectedOption = document.getElementById("calculationType").value;
    let inputValue = parseInt(document.getElementById("inputValue").value) || 0;

    // 項目ごとの計算用数値
    let calculationValues = {
        "A": 35,
        "B": 6,
        "C": 45,
        "D": 550000000,
        "E": 50000
    };

    // 項目ごとの説明テキスト
    let descriptionTexts = {
        "A": "50Lvごとに1点",
        "B": "6振ごとに1点",
        "C": "45断片ごとに1点(宝物作成済の場合は×9で断片数を計算)",
        "D": "5.5億ごとに1点(極大太刀×6振り分のカンスト値÷10)",
        "E": "5万戦ごとに1点"
    };

    // 選択された項目の数値を取得
    let selectedValue = calculationValues[selectedOption];

    // 説明文を変更
    document.getElementById("description").innerText = descriptionTexts[selectedOption];

    // 計算結果（小数点以下切り捨て）
    let result = Math.floor(inputValue / selectedValue);

    // 結果を表示
    document.getElementById("result").innerText = result;
}



// 初回更新
updateChart();
