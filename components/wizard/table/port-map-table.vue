<template>
    <div class="row" style="overflow-x:auto;margin: 0; padding-bottom: 150px;">
        <table style="width: 100%; border-collapse: separate; text-align: right; border-spacing: 0 .3em; table-layout: fixed; ">
            <tr class="head">
                <th v-for="title in titles" :width="title.width">
                    {{title.title}}
                </th>
            </tr>
            <tr class="data-head" v-for="(item, index) in items" :key="index">

                <td>{{item.port}}</td>
                <td>{{item.target_port}}</td>
                <td>{{item.protocol}}</td>
                <td class="more-button">
                    <div class="dropdown dropbtn" @click="notify(index)" style="display: flex; margin: auto">
                        <img style="margin: auto; align-self: center" src="../../../assets/svg/more.svg"
                             class="dropbtn" alt="more" @click="notify(index)">

                        <div :id="index" class="dropdown-content">

                            <a v-for="item_menu in menu" @click="item_menu.method(index)" :style="item_menu.style">

                                <img :src="require('../../../static/icons/' + item_menu.icon)"
                                     :alt="item_menu.title"/>

                                {{item_menu.title}}
                            </a>

                        </div>

                    </div>
                </td>
            </tr>
        </table>
        <slot v-if="items.length === 0"></slot>
    </div>
</template>

<script>
    export default {
        name: "port-map-table",
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
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            }

        }
    }
</script>

<style lang="stylus" scoped>

    *::-webkit-scrollbar
        display none

    *
        -ms-overflow-style none
        scrollbar-width none

    tr.head
        height 36px
        border-collapse collapse
        @media only screen and (max-width: 766px)
            height 28px

    tr.head th:first-child
        border-top-right-radius 3px
        border-bottom-right-radius 3px

    tr.head th:last-child
        border-top-left-radius 3px
        border-bottom-left-radius 3px

    tr.head th
        line-height 36px
        color #fefefe
        font-size .9em
        font-family iran-yekan
        text-align center
        background #0045ff
        @media only screen and (max-width: 766px)
            font-size .8em
            line-height 28px


    tr.data-head
        background-color #ebf4ff
        border-collapse collapse

        td
            line-height 36px
            color #4A4A4A
            font-family iran-yekan
            text-align center
            user-select none
            text-overflow: ellipsis;
            overflow hidden
            white-space: nowrap
            border-top 1px #0045ff solid
            border-bottom 1px #0045ff solid
            font-size .9em
            padding-left 5px
            padding-right 5px
            @media only screen and (max-width: 766px)
                font-size .8em
                line-height 28px

        td:last-child
            border-top-left-radius 3px
            border-bottom-left-radius 3px
            border-left 1px #0045ff solid

        td:first-child
            border-top-right-radius 3px
            border-bottom-right-radius 3px
            border-right 1px #0045ff solid


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
