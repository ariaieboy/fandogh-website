<template>
    <div class="container">
        <single>
            <section class="article">
                <article>
                    <h1>
                        ارتباط با ما
                    </h1>
                    <p>
                        هدف ما در پروژه فندق، طراحی سکویی است برای تسهیل در استقرار و کاهش هزینه نگهداری سرویس‌های
                        نرم‌افزاری که به کمک آن سرویس‌های ایرانی بتوانند تمرکز بیشتری روی کسب‌ و کار خود و نگرانی کمتری
                        در مورد امور مربوط به استقرار، پایش، نگهداری و مقیاس‌پذیری داشته باشند.
                    </p>

                    <no-ssr>
                        <GmapMap
                                :center="{lat:35.715873, lng:51.363180}"
                                :zoom="16"
                                :options="{styles: mapStyle, disableDefaultUI: true}"
                                class="map soft-corner">
                            <GmapMarker

                                    :position="{lat:35.715873, lng:51.363180}"
                                    :icon="require('~/assets/img/marker.png')"
                            />
                        </GmapMap>
                    </no-ssr>

                    <div>
                        <ul>
                            <li>
                                آدرس: تهران، ستارخان، دریان‌نو، پلاک ۴۴، طبقه ۵
                            </li>
                            <li>
                                تلفن: ۰۲۱۲۸۴۲۲۳۸۳
                            </li>
                            <li>
                                ایمیل: support[at]fandogh.cloud
                            </li>

                        </ul>
                    </div>
                </article>
            </section>
        </single>
    </div>
</template>

<script>
    import Single from '~/components/Single'

    export default {
        data() {
            return {
                mapStyle: [
                    {
                        'featureType': 'administrative',
                        'elementType': 'labels.text.fill',
                        'stylers': [
                            {
                                'color': '#ff9400'
                            }
                        ]
                    },
                    {
                        'featureType': 'administrative.province',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'visibility': 'off'
                            }
                        ]
                    },
                    {
                        'featureType': 'landscape',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'saturation': -100
                            },
                            {
                                'lightness': 65
                            },
                            {
                                'visibility': 'on'
                            }
                        ]
                    },
                    {
                        'featureType': 'poi',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'saturation': -100
                            },
                            {
                                'lightness': 51
                            },
                            {
                                'visibility': 'simplified'
                            }
                        ]
                    },
                    {
                        'featureType': 'poi.park',
                        'elementType': 'geometry.fill',
                        'stylers': [
                            {
                                'lightness': '0'
                            },
                            {
                                'visibility': 'on'
                            },
                            {
                                'saturation': '12'
                            },
                            {
                                'color': '#adf4bb'
                            }
                        ]
                    },
                    {
                        'featureType': 'road.highway',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'saturation': -100
                            },
                            {
                                'visibility': 'simplified'
                            }
                        ]
                    },
                    {
                        'featureType': 'road.arterial',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'saturation': -100
                            },
                            {
                                'lightness': 30
                            },
                            {
                                'visibility': 'on'
                            }
                        ]
                    },
                    {
                        'featureType': 'road.arterial',
                        'elementType': 'labels.text.fill',
                        'stylers': [
                            {
                                'color': '#ff9400'
                            }
                        ]
                    },
                    {
                        'featureType': 'road.local',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'saturation': -100
                            },
                            {
                                'lightness': 40
                            },
                            {
                                'visibility': 'on'
                            }
                        ]
                    },
                    {
                        'featureType': 'road.local',
                        'elementType': 'labels.text.fill',
                        'stylers': [
                            {
                                'color': '#7c7c7c'
                            }
                        ]
                    },
                    {
                        'featureType': 'transit',
                        'elementType': 'all',
                        'stylers': [
                            {
                                'saturation': -100
                            },
                            {
                                'visibility': 'simplified'
                            }
                        ]
                    },
                    {
                        'featureType': 'water',
                        'elementType': 'geometry',
                        'stylers': [
                            {
                                'hue': '#ffff00'
                            },
                            {
                                'lightness': -25
                            },
                            {
                                'saturation': -97
                            }
                        ]
                    },
                    {
                        'featureType': 'water',
                        'elementType': 'labels',
                        'stylers': [
                            {
                                'visibility': 'on'
                            },
                            {
                                'lightness': -25
                            },
                            {
                                'saturation': -100
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            Single
        },
        head() {
            return {
                title: "ارتباط با ما",
                meta: [
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content: 'سکو,فندق,تیم,توسعه,نرم افزار,سرویس,مقیاس‌پذیری,تهران'
                    },
                ]
            };
        }
    }
</script>

<style lang="stylus">
    .map
        height 250px

    .article
        ul
            li
                color #000
                padding 7px 0

                &:first-child
                    margin-top 60px
</style>
