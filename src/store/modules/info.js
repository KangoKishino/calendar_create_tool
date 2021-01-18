import holidayData from '../../assets/holiday.json'

export default {
    state() {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            nowDate: '',
            dates: [],
            weeks: [],
            detailedSettings: {
                color1: '#1AE578',
                color2: '#ff0000',
                color3: '#ffffff',
                color4: '#cccccc',
                width: 20,
                height: 20,
                border: 0
            },
            outputDates: ''
        }
    },
    mutations: {
        clearCalender(state) {
            state.weeks = []
        },
        getCalendarHead(state) {
            const n = new Date(state.year, state.month, 1).getDay()

            for(let i = 0; i < n; i++) {
                state.dates.unshift({
                    date: '',
                    isThisMonth: false,
                })
            }
        },
        getCalendarBody(state, joindHoliday) {
            const lastDate = new Date(state.year, state.month + 1, 0).getDate()
            for(let i = 1; i <= lastDate; i++) {
                let judgeHoliday = joindHoliday.includes(state.year+'-'+String(state.month + 1).padStart(2, '0')+'-'+String(i).padStart(2, '0'))
                if (judgeHoliday) {
                    state.dates.push({
                        date: i,
                        isThisMonth: true,
                        color: 0,
                        isHoliday: true
                    })
                } else {
                    state.dates.push({
                        date: i,
                        isThisMonth: true,
                        color: 0,
                        isHoliday: false
                    })
                }
                
            }
        },
        getCalendarTail(state) {
            const lastDay = new Date(state.year, state.month + 1, 0).getDay()
            for (let i = 1; i < 7 - lastDay; i++) {
                state.dates.push({
                    date: '',
                    isThisMonth: false,
                })
            }
        },
        renderWeeks(state) {
            const weeksCount = state.dates.length / 7
            for (let i = 0; i < weeksCount; i++) {
                state.weeks.push(state.dates.splice(0,7))
            }
        },
        prevMonth(state) {
            state.month--
            if (state.month < 0) {
                state.year--
                state.month = 11
            }
        },
        nextMonth(state) {
            state.month++
            if (state.month > 11) {
                state.year++
                state.month = 0
            }
        },
        changeStatus(state, {index, day}) {
            if(state.weeks[index][day].color === 2) {
                state.weeks[index][day].color = 0
            } else {
                state.weeks[index][day].color++
            }
        },
        setWidth(state, value) {
            state.detailedSettings.width = value
        },
        setHeight(state, value) {
            state.detailedSettings.height = value
        },
        setBorder(state, value) {
            state.detailedSettings.border = value
        },
        updateColor1(state, eventData) {
            state.detailedSettings.color1 = eventData.hex
        },
        updateColor2(state, eventData) {
            state.detailedSettings.color2 = eventData.hex
        },
        updateColor3(state, eventData) {
            state.detailedSettings.color3 = eventData.hex
        },
        updateColor4(state, eventData) {
            state.detailedSettings.color4 = eventData.hex
        },
        outputDate(state) {
            let temporaryDates = []
            for (let i = 0; i < state.weeks.length; i++) {
                temporaryDates.push(`<tr style="height:${state.detailedSettings.height}px;">`)
                for (let j = 0; j < 7; j++) {
                    if (state.weeks[i][j].isThisMonth === false) {
                        temporaryDates.push(`<td></td>`);
                    } else if ((state.weeks[i][j].isHoliday || j === 0) && state.weeks[i][j].color === 0) {
                        temporaryDates.push(`<td style="color:red">${state.weeks[i][j].date}</td>`);
                    } else if ((state.weeks[i][j].isHoliday || j === 0) && state.weeks[i][j].color === 1) {
                        temporaryDates.push(`<td style="color:red;background-color:${state.detailedSettings.color1};">${state.weeks[i][j].date}</td>`);
                    } else if ((state.weeks[i][j].isHoliday || j === 0) && state.weeks[i][j].color === 2) {
                        temporaryDates.push(`<td style="color:red;background-color:${state.detailedSettings.color2};">${state.weeks[i][j].date}</td>`);
                    } else if (j === 6 && state.weeks[i][j].color === 0) {
                        temporaryDates.push(`<td style="color:blue">${state.weeks[i][j].date}</td>`);
                    } else if (j === 6 && state.weeks[i][j].color === 1) {
                        temporaryDates.push(`<td style="color:blue;background-color:${state.detailedSettings.color1};">${state.weeks[i][j].date}</td>`);
                    } else if ((state.weeks[i][j].isHoliday || j === 0) && state.weeks[i][j].color === 2) {
                        temporaryDates.push(`<td style="color:blue;background-color:${state.detailedSettings.color2};">${state.weeks[i][j].date}</td>`);
                    } else if (state.weeks[i][j].color === 0) {
                        temporaryDates.push(`<td>${state.weeks[i][j].date}</td>`);
                    } else if (state.weeks[i][j].color === 1) {
                        temporaryDates.push(`<td style="background-color:${state.detailedSettings.color1};">${state.weeks[i][j].date}</td>`);
                    } else {
                        temporaryDates.push(`<td style="background-color:${state.detailedSettings.color2};">${state.weeks[i][j].date}</td>`);
                    }
                }
                temporaryDates.push(`</tr>\n`)
            }
            const temporaryJoinDates = temporaryDates.join('')
            state.outputDates = `<!-- ${state.year}/${state.month + 1} -->
<table width="${state.detailedSettings.width * 7}" border="0" cellspacing="${state.detailedSettings.border}" style="font:12px;background-color:${state.detailedSettings.color4};border-collapse:separate;">
<tbody style="color:#000000;background-color:${state.detailedSettings.color3};text-align:center;">
<tr style="height:${state.detailedSettings.height}px;">
<td colspan="7">${state.year}/${state.month + 1}</td>
</tr>
<tr style="height:${state.detailedSettings.height}px;">
<td style="color:ff0000;">Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td style="color:0000ff;">Sat</td>
</tr>
${temporaryJoinDates}
</tbody>
</table>
<!-- end -->`
        }

    },
    getters: {
        nowDate(state) {
            return state.nowDate
        },
        year(state) {
            return state.year
        },
        month(state) {
            return state.month
        },
        dates(state) {
            return state.dates
        },
        weeks(state) {
            return state.weeks
        },
        detailedSettings(state) {
            return state.detailedSettings
        },
        outputDates(state) {
            return state.outputDates
        },
    },
    actions: {
        fetchCalendar({ commit }) {
            let joindHoliday = ''
            for (let i = 0; i < holidayData.length; i++) {
                joindHoliday += holidayData[i].holiday
            }
            commit('clearCalender')
            commit('getCalendarHead')
            commit('getCalendarBody', joindHoliday)
            commit('getCalendarTail')
            commit('renderWeeks')
        },
        prevMonth({ dispatch, commit }) {
            commit('prevMonth')
            dispatch('fetchCalendar')
        },
        nextMonth({ dispatch, commit }) {
            commit('nextMonth')
            dispatch('fetchCalendar')
        },
        changeStatus({ commit }, {index, day}) {
            commit('changeStatus', {index, day})
        },
        outputDate({ commit }) {
            commit('outputDate')
        }
    }
}