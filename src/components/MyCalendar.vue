<template>
    <tr>
        <td @click="changeStatus(0)"
            :style="styles"
            :class="{pallet1 : judgeStatus1(0), pallet2 : judgeStatus2(0), holiday : judgeHoliday(0)}">
                {{ week[0].date }}
        </td>
        <td @click="changeStatus(1)"
            :style="styles"
            :class="{pallet1 : judgeStatus1(1), pallet2 : judgeStatus2(1), holiday : judgeHoliday(1)}">
                {{ week[1].date }}
        </td>
        <td @click="changeStatus(2)"
            :style="styles"
            :class="{pallet1 : judgeStatus1(2), pallet2 : judgeStatus2(2), holiday : judgeHoliday(2)}">
                {{ week[2].date }}
        </td>
        <td @click="changeStatus(3)"
            :style="styles"
            :class="{pallet1 : judgeStatus1(3), pallet2 : judgeStatus2(3), holiday : judgeHoliday(3)}">
                {{ week[3].date }}
        </td>
        <td @click="changeStatus(4)"
            :style="styles"
            :class="{pallet1 : judgeStatus1(4), pallet2 : judgeStatus2(4), holiday : judgeHoliday(4)}">
                {{ week[4].date }}
        </td>
        <td @click="changeStatus(5)"
            :style="styles"
            :class="{pallet1 : judgeStatus1(5), pallet2 : judgeStatus2(5), holiday : judgeHoliday(5)}">
                {{ week[5].date }}
        </td>
        <td @click="changeStatus(6)"
            :style="styles"
            :class="{pallet1 : judgeStatus1(6), pallet2 : judgeStatus2(6), holiday : judgeHoliday(6)}">
                {{ week[6].date }}
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        week: Array,
        index: Number,
        styles: Object,
    },
    methods: {
        judgeStatus1(day) {
            if(this.week[day].color === 1) {
                return true
            }
        },
        judgeStatus2(day) {
            if(this.week[day].color === 2) {
                return true
            }
        },
        judgeHoliday(day) {
            if(this.week[day].isHoliday) {
                return true
            }
        },
        changeStatus(day) {
        this.$store.dispatch('changeStatus', {index: this.index, day: day})
        }
    },
}
</script>

<style scoped>
td {
    cursor: pointer;
    user-select: none;
}

td:last-child {
    color: blue;
}

td:first-child {
    color: red;
}

.holiday {
    color: red !important; 
}

</style>