/* 
    ©2024 세현 all rights reserved. 
*/

const last_first = '지하민은태서유시재예승도윤다준주현수세정이아동성채가연소진혜우나한희규선찬효해로영건라상리인여보강경호루율원단설제온범형석대종환창기솔혁슬별미송'
const last_last  = '현준민우원윤영진빈율연아은희호하성서주인혁나훈찬안수이린정재온경후솔환유리건욱담지규한람림석랑겸헌형라결운완범별미설예오기승엘채슬봄혜비령늘용웅울루언휘름임선'
const first_name = '김이박최정강조윤장임한오서신권황안송전홍유고문양손배조백허유남심노곽성원천'

/*  가중치  */
const lf_weight = {
    "지": 20,
    "하": 20,
    "민": 20,
    "은": 15,
    "태": 15,
    "서": 15,
    "유": 10,
    "시": 10,
    "재": 10,
    "예": 5,
    "승": 5,
    "도": 5
}

const ll_weight = {
    "현": 20,
    "준": 20,
    "민": 20,
    "우": 15,
    "원": 15,
    "윤": 15,
    "영": 10,
    "진": 10,
    "빈": 10,
    "율": 5,
    "연": 5,
    "아": 5
}

const f_weight = {
    "김": 8,
    "이": 8,
    "박": 7,
    "정": 5,
    "최": 3,
    "권": 2,
    "신": 2
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randStr(str) {
    return str[rand(0,str.length-1)]
}

function applyWeight(str, preset) {
    for (const [s, count] of Object.entries(preset)) {
        str += s.repeat(count);
    }
    return str;
}

function createName(options = { noWeight: false }) {

    const noWeight = options?.noWeight;

    let final_lf = last_first;
    let final_ll = last_last;
    let final_f  = first_name;

    if(!noWeight) {
        final_lf = applyWeight(last_first, lf_weight);
        final_ll = applyWeight(last_last, ll_weight);   
        final_f  = applyWeight(first_name, f_weight);   
    }

    //console.log(final_lf,final_ll);
    const genLast  = () => randStr(final_lf)+randStr(final_ll);
    const genFirst = () => randStr(final_f);

    let last  = genLast();
    let first = genFirst();
    
    // last의 두 개의 문자열이 같지 않게하기
    while(last[0] === last[1]) last = genLast();

    return {
        first: first,
        last: last
    }
}