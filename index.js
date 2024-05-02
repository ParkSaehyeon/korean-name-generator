const output     = document.querySelector("#output");
const createBtn  = document.querySelector("#create-btn");
const rollBtn    = document.querySelector("#roll-btn");
const copyBtn    = document.querySelector("#copy-btn")
const createTime = document.querySelector("#create-time");
const rollTime   = document.querySelector("#roll-time");
const rollPriod  = document.querySelector("#roll-priod");

let rollInterval;

function randomOutput() {

    output.innerHTML = "";

    const names = [];

    for(let i = 0; i < createTime.value ?? 1; i++) {
        names.push(createName());
    }

    let line = [];
    let line_amount = Math.ceil(names.length / 5);

    for(let i = 0; i < line_amount; i++) {

        line = [];

        for(let j = 5*i; j < 5*(i+1); j++) {

            if(names.length-1 < j) {
                break;
            }

            line.push(names[j]);
        }

        output.innerHTML += (
            line.map(name => name.first+name.last).join(", ")+
            (line_amount-1 !== i && line_amount > 1 ? "<br />" : "")
        )
    }
}

createBtn.addEventListener('click', () => {

    randomOutput();
})

rollBtn.addEventListener('click', () => {

    function stop() {
        rollBtn.innerHTML = "돌리기";
        clearInterval(rollInterval);
    }

    if(rollBtn.textContent === "돌리기") {

        rollBtn.innerHTML = "멈추기";

        // 돌리기 시간 가져오기
        const roll_time  = rollTime.value;
        const roll_priod = rollPriod.value <= 0 ? 50 : rollPriod.value;

        randomOutput();

        rollInterval = (
            setInterval(() => {
                randomOutput();
            },roll_priod)
        )

        if(roll_time > 0) {

            setTimeout(() => {
                stop();
            },roll_time);
        }

    }

    else if(rollBtn.textContent === "멈추기") {
        stop();
    }
})

copyBtn.addEventListener('click',() => {
    const ta = document.createElement("textarea");
    ta.value = output.innerHTML;
    document.body.append(ta);

    ta.focus();
    ta.setSelectionRange(0,ta.value.length);

    document.execCommand('copy', false);

    ta.remove();
})