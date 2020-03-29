<template>

    <div class="row" style="overflow-x:auto;margin: 0; padding-left: 5px; padding-right: 5px; padding-bottom: 150px">
        <table style="width: 100%; border-collapse: separate; text-align: right; border-spacing: 0 .1em; table-layout: fixed">
            <tr class="head">
                <th v-for="title in titles" :width="title.width">
                    {{title.title}}
                </th>
            </tr>
            <tr class="data-head" v-for="(item, index) in items">

                <td :class="title.class" v-html="item[title.name]" v-for="title in titles"
                    @click="func? func(index) : ''"
                    v-tooltip="!item[title.name] ? null : item[title.name].toString().length > 12 ? item[title.name].toString().includes('canvas')
                    ? null : item[title.name] : null"
                    :style="{cursor: (func ? 'pointer' : 'unset')}">
                    {{item[title.name]}}
                </td>

                <td v-if="menu.length > 0" class="more-button">
                    <div class="dropdown dropbtn" @click="notify(index)" style="margin: auto; display: flex">
                        <img style="margin: auto; align-self: center" src="../../../assets/svg/more.svg"
                             class="dropbtn" alt="more" @click="notify(index)">

                        <div :id="index" class="dropdown-content">

                            <a v-for="item in menu" @click="item.method(index)" :style="item.style">

                                <img :src="require('../../../static/icons/' + item.icon)"
                                     :alt="item.title"/>

                                {{item.title}}
                            </a>

                        </div>

                    </div>
                </td>
            </tr>
        </table>
    </div>

</template>

<script>
    export default {
        name: "box-table",
        props: ['items', 'titles', 'menu', 'func'],
        methods: {
            notify(id) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }

                document.getElementById(id).classList.toggle("show");
            }
        },
        created() {
            window.onclick = function (event) {
                if (!event.target.matches('.dropbtn')) {
                    var dropdowns = document.getElementsByClassName("dropdown-content");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i].toString();
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped lang="stylus">

    @import '../../../assets/css/variables.styl'

    *::-webkit-scrollbar
        display none

    *
        -ms-overflow-style none
        scrollbar-width none

    tr.head
        height 25px
        border-collapse collapse
        border none
        padding-bottom 16px

    tr.head th
        line-height 25px
        color #4A4A4A
        padding-left 12px
        padding-right 12px
        padding-bottom 16px
        font-size 1em
        font-family iran-yekan
        text-align right
        @media only screen and (max-width: 766px)
            font-size .8em
            padding 5px 8px

    tr.data-head
        background-color #fefefe
        margin-bottom 16px
        box-shadow 0 1px 1px rgba(0, 0, 0, 0.07)

        td
            line-height $indexTableRowHeight
            color #4A4A4A
            padding 8px 12px
            font-family iran-yekan
            text-align right
            cursor: pointer
            text-overflow: ellipsis;
            overflow hidden
            white-space: nowrap
            font-size 1em
            @media only screen and (max-width: 766px)
                font-size .7em
                padding 5px 12px


        td.more-button
            padding 0
            overflow visible !important

            div
                padding 0

                img
                    @media only screen and (max-width: 766px)
                        width 7px
                        height 15px


    .dropbtn {
        border: none;
        cursor: pointer;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content
        display none
        position absolute
        background-color #fefefe
        border-radius 3px
        min-width 160px
        overflow auto
        box-shadow 3px 4px 12px 0 rgba(0, 0, 0, 0.2)
        z-index 1
        left 10px
        top 0
        @media only screen and (max-width: 766px)
            left 4px


    .dropdown-content
        a
            color: #000000;
            padding: 8px 16px;
            text-decoration: none;
            font-family iran-yekan
            font-size .8em
            margin auto
            display: flex;
            @media only screen and (max-width: 766px)
                padding: 0 16px;
                font-size 1em

            img
                width 16px
                height 16px
                margin-top auto
                margin-bottom auto
                margin-left 12px


    .dropdown a:hover {
        background-color: #f0f0f0;
    }

    .show {
        display: block;
    }

</style>
