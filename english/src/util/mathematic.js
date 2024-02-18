export const DATA = [
    {
        id: 1,
        name: "hello",
        meaningVN: "Xin Chào",
        egEN: "Hello, Everyone",
    },
    {
        id: 2,
        name: "company",
        meaningVN: "Công Ty",
        egEN: "He works for a software company that makes software.",
    },
    {
        id: 3,
        name: "work",
        meaningVN: "Công việc",
        egEN: "What sort of work are you experienced in?",
    },
    {
        id: 4,
        name: "involve",
        meaningVN: "Liên quan",
        egEN: "I prefer teaching methods that actively involve students in learning.",
    },
    {
        id: 4,
        name: "involve a love",
        meaningVN: "Liên quan",
        egEN: "I prefer teaching methods that actively involve a love students in learning.",
    }
]

const TYPE_QUESTION = {
    choose: "ChoosingQuestion",
    typing: "TypingQuestion",
}

export const factoryValue = () => {
    let result = {
        type: TYPE_QUESTION.choose,
        data: []
    }
    const typeQuestion = Date.now().toPrecision() % 2 == 0 ? TYPE_QUESTION.choose : TYPE_QUESTION.typing;
    let random = Math.floor(Math.random() * (DATA.length - 1));
    const dataRandom = DATA[random];
    if (typeQuestion === TYPE_QUESTION.choose) {

        let data = []
        Array.from({ length: 3 }, (v, index) => {
            data.push(DATA[index].meaningVN);
        });
        data.push(dataRandom.meaningVN)

        result = {
            ...result,
            data: {
                sentence: dataRandom.egEN,
                wordUnderline: dataRandom.name,
                means: data,
            }
        }

    } else {
        result = {
            type: TYPE_QUESTION.typing,
            data: dataRandom,
        }
    }

    return result;
}