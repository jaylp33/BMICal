var weightInput = document.getElementById('weightInput'),
heightInput = document.getElementById('heightInput'),
weight = '',
height = '',
btn = document.querySelector('.result'),
clearResult = document.querySelector('.clearResult');
localResult = JSON.parse(localStorage.getItem('bmi')) || [];

weightInput.oninput = e => {
    weight = e.target.value;
    if(!isNaN(weight)) {
        weightInput.classList.remove('error');
        weightInput.previousElementSibling.innerHTML = "體重 kg"
    } else {
        weightInput.classList.add('error');
        weightInput.previousElementSibling.innerHTML = "體重 kg   (請輸入有效值)"
    }
}
heightInput.oninput = e => {
    height = e.target.value;
    if(!isNaN(height)) {
        heightInput.classList.remove('error');
        heightInput.previousElementSibling.innerHTML = "身高 cm"
    } else {
        heightInput.classList.add('error');
        heightInput.previousElementSibling.innerHTML = "身高 cm   (請輸入有效值)"
    }
}

clearResult.addEventListener('click', e => {
    localStorage.setItem('bmi','[]')
    updateList();
})

btn.addEventListener('click', e => { 
    bmiCal(height, weight); 

})


const bmiCal = (height,weight) => {
    if(height ==''||weight == '') {
        alert('please enter correct info')
        return
    }
    var localResult = JSON.parse(localStorage.getItem('bmi')) || [];

    if($(this.btn).hasClass('active')) {
        $(this.btn).removeClass('active');
        $(this.btn).css({
            'border-color': 'unset',
            'color': "#424242",
        })
        $(this.btn).html('看結果');
        return
    }
    var str = '';
    height = height.substring(0,1)+"."+height.substring(1);
    var bmi = weight/Math.pow(height,2);
    


    Date.prototype.ddmmyyyy = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [
            (dd>9 ? '' : '0') + dd + '/',
            (mm>9 ? '' : '0') + mm + '/',
            this.getFullYear()
               ].join('');
    };

    var date = new Date();

    var result = (bmi < 18.5) ? '過輕'
               : (18.5 <= bmi && bmi < 24) ? '理想'
               : (24 < bmi && bmi < 27) ? '過重'
               : (27 <= bmi && bmi < 30) ? '輕度肥胖'
               : (30 <= bmi && bmi < 35) ? '中度肥胖'
               : (35 <= bmi) ? '重度肥胖'
               : null;


    color = '';

    // 練習一個switch
    switch(result){
        case '過輕':
            color = '#31BAF9'
            break;
        case '理想':
            color = '#86D73F'
            break;
        case '過重':
            color = '#FF982D'
            break;
        case '輕度肥胖':
            color = '#FF6C02'
            break;
        case '中度肥胖':
            color = '#FF6C02'
            break;
        case '重度肥胖':
            color = '#FF1200'
            break;
    }

    var ID = function () {
        
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    str = {
        id: ID(),
        result : result,
        bmi: bmi,
        weight: weight,
        height: height,
        date: date.ddmmyyyy(),
        color: color,
    }

    localResult.push(str);

    localStorage.setItem('bmi',JSON.stringify(localResult));

    $(this.btn).addClass('active');

    var btn = `<div class="moreResult flexCenter"><i class="fas fa-undo"></i></div>`;

    $(this.btn).html(btn+result);
    $(this.btn).css({
        'border-color': color,
        'color': color,
    })
    $(this.btn).find('.moreResult').css({
        'background': color
    })

    updateList();

}


const updateList = () => {
    var bmiList = JSON.parse(localStorage.getItem('bmi')) || [];

    var str = '';

    console.log('update')

    for (const i in bmiList) {
        if (bmiList.hasOwnProperty(i)) {
            const e = bmiList[i];
            e.bmi = e.bmi.toFixed(3);
            str += `<div class="recordContainer" style="border-color:${e.color}" data-id="${e.id}">
            <span class="bmiResult">${e.result}</span>
            <div><span class="bmi">BMI</span>${e.bmi}</div>
            <div><span class="weight">體重</span>${e.weight}</div>
            <div><span class="height">身高</span>${e.height}</div>
            <div><span class="date">${e.date}<i class="fas fa-times"></i></span></div>
        </div>`
        }
    }

    document.querySelector('.record').innerHTML = str;

}

$(document).on('click','.fa-times', function() {
    $(this).parent().parent().parent().addClass('deleteClass');
    var id = $(this).parent().parent().parent().data('id');

    console.log(id);

    setTimeout(function() {
        $(this).parent().parent().parent().remove();
    }.bind(this), 500);

    for (let i = 0; i < localResult.length; i++) {
        const e = localResult[i];
        if(e.id == id) {
            localResult.splice(i,1)
        }
        
    }

    localStorage.setItem('bmi',JSON.stringify(localResult));
})


const init = () => {
    var data = JSON.parse(localStorage.getItem('bmi')) || [];
    var str = '';

    
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        const e = data[i];
        e.bmi = e.bmi.toFixed(3);
        str += `<div class="recordContainer" style="border-color:${e.color}" data-id="${e.id}">
            <span class="bmiResult">${e.result}</span>
            <div><span class="bmi">BMI</span>${e.bmi}</div>
            <div><span class="weight">體重</span>${e.weight}</div>
            <div><span class="height">身高</span>${e.height}</div>
            <div><span class="date">${e.date}<i class="fas fa-times"></i></span></div>
        </div>`
    }
    document.querySelector('.record').innerHTML = str;

}

init();
