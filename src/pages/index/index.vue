<template>
  <div class="index_page">
		<pub-header  ></pub-header>

		<!-- 地图 -->
		<div class="map_box">
			<div class="content_wrap">
				<div class="item_wrap st_1">
					<div class="item_text">
						<p class="name">丁兰街道</p>
						<p class="num">重点培育: 150家</p>
					</div>
					<p class="dot item_dot"></p>
				</div>
				<div class="item_wrap st_2">
					<div class="item_text">
						<p class="name">钱塘智慧城</p>
						<p class="num">重点培育: 150家</p>
					</div>
					<p class="dot item_dot"></p>
				</div>
				<div class="item_wrap st_3">
					<div class="item_text">
						<p class="name">四季青街道</p>
						<p class="num">重点培育: {{ streetInfo.四季青街道 }}家</p>
					</div>
					<p class="dot item_dot"></p>
				</div>
				<div class="item_wrap st_4">
					<div class="item_text">
						<p class="name">采荷街道</p>
						<p class="num">重点培育: {{ streetInfo.采荷街道 }}家</p>
					</div>
					<p class="dot item_dot"></p>
				</div>
				<div class="item_wrap st_5">
					<div class="item_text">
						<p class="name">凯旋街道</p>
						<p class="num">重点培育: {{ streetInfo.凯旋街道 }}家</p>
					</div>
					<p class="dot item_dot"></p>
				</div>
				<div class="item_wrap st_6">
					<div class="item_text">
						<p class="name">彭埠街道</p>
						<p class="num">重点培育: {{ streetInfo.彭埠街道 }}家</p>
					</div>
					<p class="dot item_dot"></p>
				</div>
				<div class="item_wrap st_7">
					<div class="item_text">
						<p class="name">笕桥街道</p>
						<p class="num">重点培育: {{ streetInfo.笕桥街道 }}家</p>
					</div>
					<p class="dot item_dot"></p>
				</div>
				<div class="item_wrap st_8">
					<div class="item_text">
						<p class="name">闸弄口街道</p>
						<p class="num">重点培育: {{ streetInfo.闸弄口街道 }}家</p>
					</div>
					<p class="dot item_dot"></p>
				</div>
			</div>
		</div>

		<!-- 内容 -->
		<div class="content_wrap">
			<div class="num_list clearfix" >
				<div class="item">
					<p class="title">企业总数（家）</p>
					<p class="num_line">
						<span class="num">{{ statistics.totalNum }}</span>
						<!-- <span class="up">+2</span> -->
					</p>
				</div>
				<div class="item">
					<p class="title">储备库企业数（家）</p>
					<p class="num_line">
						<span class="num">{{ statistics.storeNum }}</span>
					</p>
				</div>
				<div class="item">
					<p class="title">参与调研企业数（家）</p>
					<p class="num_line">
						<span class="num">{{ statistics.researchNum }}</span>
					</p>
				</div>
				<div class="item">
					<p class="title">重点培育企业数（家）</p>
					<p class="num_line">
						<span class="num">{{ statistics.keyNum }}</span>
					</p>
				</div>
				<div class="item">
					<p class="title">已认定国高企业数（家）</p>
					<p class="num_line">
						<span class="num">{{ statistics.ggNum }}</span>
					</p>
				</div>
				<div class="item">
					<p class="title">已认定市高企业数（家）</p>
					<p class="num_line">
						<span class="num">{{ statistics.sjNum }}</span>
					</p>
				</div>
				<div class="item">
					<p class="title">已认定省科企业数（家）</p>
					<p class="num_line">
						<span class="num">{{ statistics.skNum }}</span>
					</p>
				</div>
				<div class="item">
					<p class="title">其他已认定项目企业数（家）</p>
					<p class="num_line">
						<span class="num">{{ statistics.otherNum }}</span>
					</p>
				</div>

				<div class="item item_b">
					<p class="title">发明专利授权数／2019年预估（件）</p>
					<p class="num_line">
						<span class="num">{{ statistics.inventionPatentNum }} / {{ statistics.ygPatentNum }}</span>
					</p>
				</div>
				<div class="item item_b">
					<p class="title">实用新型授权数（件）</p>
					<p class="num_line">
						<span class="num">{{ statistics.utilityModelPatentNum }}</span>
					</p>
				</div>
				<div class="item item_b">
					<p class="title">外观专利授权数（件）</p>
					<p class="num_line">
						<span class="num">{{ statistics.industrialDesignPatentNum }}</span>
					</p>
				</div>
				<div class="item item_b">
					<p class="title">软著授权数（件）</p>
					<p class="num_line">
						<span class="num">{{ statistics.softNum }}</span>
					</p>
				</div>
			</div>
			<div class="list_wrap clearfix">
				<div class="list_box">
					<div class="title_box">
						<span class="txt">重点培育的企业列表</span>
						<span class="more"  @click="pathTo('/home/list/list?type=43')">查看更多</span>
					</div>
					<div class="company_wrap">
						<div class="item clearfix" v-for="(item, idx) in keyList" :key="idx">
							<p class="lef">
								<span class="company">{{ idx+1 }} &nbsp; {{ item.companyName }}</span>
							</p>
							<p class="rig">
								<span class="statu">{{ item.apply2019Status | applyStatus }}</span>
								<span class="time" v-if="item.result">{{ item.result | result }}</span>
							</p>
						</div>
					</div>
				</div>
				<div class="list_box">
					<div class="title_box">
						<span class="txt">储备库的企业列表</span>
						<span class="more"  @click="pathTo('/home/list/list?type=43')">查看更多</span>
					</div>
					<div class="company_wrap">
						<div class="item clearfix" v-for="(item, idx) in storeList" :key="idx">
							<p class="lef">
								<span class="company">{{ idx+1 }} &nbsp; {{ item.companyName }}</span>
							</p>
							<p class="rig">
								<span class="time">{{ item.result | result}}</span>
							</p>
						</div>
					</div>
				</div>
				<div class="list_box">
					<div class="title_box">
						<span class="txt">参与调研的企业列表</span>
						<span class="more"  @click="pathTo('/home/list/list?type=43')">查看更多</span>
					</div>
					<div class="company_wrap">
						<div class="item clearfix" v-for="(item, idx) in companyList" :key="idx">
							<p class="lef">
								<span class="company">{{ idx+1 }} &nbsp; {{ item.companyName }}</span>
							</p>
							<p class="rig">
								<span class="statu">{{ item.apply2019Status | applyStatus }}</span>
								<span class="time" v-if="item.result">{{ item.result | result }}</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="footer">
				© 2018 杭州市江干区科技局版权所有
			</div>

		</div>


	</div>
</template>

<script>
	import Filters from 'utils/filters'
	import pubHeader from 'components/public/header.vue'
	export default {
		data() {
			return {
				dataObj: {}, //数据
				streetInfo: {},
				companyList: [],
				keyList: [],
				storeList: [],
				statistics: {},
			}
		},
		components: {
			pubHeader
		},
		mounted () {
			this.initFn();
		},
		methods: {
			async initFn () {
				try {
					let resp = await this.API.homePage.index();
					this.dataObj = resp;
					this.streetInfo = resp.streetInfo; //街道数据
					this.companyList = resp.companyList; //参与调研企业
					this.keyList = resp.keyList; //重点培育列表
					this.storeList = resp.storeList; //储备库
					this.statistics = resp.statistics; //统计
				}
				catch (e) {}
			}
		},
		filters: {
			dateFormat: Filters.pubFilters.filters.dateFormat,
			applyStatus: Filters.statusFilters.filters.applyStatus,
			result: Filters.statusFilters.filters.result,
		}
	}
</script>


<style lang="scss">
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.index_page {
		width: 100%; min-height: 100%; background: #fff;
		.map_box {
			width: 100%; height: 716px; background: url('~assets/img/index/map.jpg') center center no-repeat #f9f8f6; position: relative; 
			.content_wrap {
				width: 1200px; height: 580px; position: absolute; left: 50%; margin-left: -600px; top: 0;
				.item_wrap {
					position: absolute; width: 104px; height: 74px; opacity: 0; animation: fadeIn 1s linear; animation-fill-mode: forwards;
					.item_text {
						width: 104px; height: 50px; background: #FFA64B; padding: 6px; box-shadow:0px 2px 4px 0px rgba(0,0,0,0.07); position: absolute;
						.name {font-size: 12px; color: #fff; line-height: 17px;}
						.num {font-size: 12px; color: #fff; line-height: 17px; margin-top: 2px;}
						&:after {width: 0; height: 0; border: 7px solid transparent; border-top-width: 8px; border-bottom-width: 8px; border-top-color: #FFA64B; content: ''; position: absolute; }
					}
					.item_dot {width: 14px; height: 14px; background: #FFA64B; border: 2px solid #fff; box-shadow:0px 2px 2px 0px rgba(0,0,0,0.09); border-radius: 50%; position: absolute; }
				}
				.st_1 {
					top: 167px; left: 480px; 
					.item_text {
						background: #FFA64B;
						&:after {border-top-color: #FFA64B; left: 20px; bottom: -16px;}
					}
					.item_dot { background: #FFA64B; left: 20px; bottom: 0;}
				}
				.st_2 {
					top: 254px; left: 591px; animation-delay:1s;
					.item_text {
						background: #5762C4;
						&:after {border-top-color: #5762C4; left: 20px; bottom: -16px;}
					}
					.item_dot { background: #5762C4; left: 20px; bottom: 0;}
				}
				.st_3 {
					top: 430px; left: 460px; width: 130px; height: 48px; animation-delay:1.5s;
					.item_text {
						background: #5498BA; right: 0;
						&:after {border-top-color: #5498BA; left: -15px; transform: rotate(90deg); top: 17px;}
					}
					.item_dot { background: #0A9FE8; left: 0; top: 16px;}
				}
				.st_4 {
					top: 467px; left: 390px; animation-delay:2s;
					.item_text {
						background: #5498BA; bottom: 0;
						&:after {border-top-color: transparent; border-bottom-color: #5498BA; top: -16px; right: 20px;}
					}
					.item_dot { background: #35AECB; right: 20px; top: 0;}
				}
				.st_5 {
					top: 376px; left: 361px; animation-delay:2.5s;
					.item_text {
						background: #4E6DD7; top: 0;
						&:after {border-top-color: #4E6DD7; bottom: -16px; right: 20px;}
					}
					.item_dot { background: #3966FF; right: 20px; bottom: 0;}
				}
				.st_6 {
					top: 326px; left: 450px; z-index: 10; animation-delay:3s;
					.item_text {
						background: #7158DE; top: 0;
						&:after {border-top-color: #7158DE; left: 20px; bottom: -16px;}
					}
					.item_dot { background: #5E39FF; left: 20px; bottom: 0;}
				}
				.st_7 {
					top: 260px; left: 464px; animation-delay:3.5s;
					.item_text {
						background: #E26743; top: 0;
						&:after {border-top-color: #E26743; left: 20px; bottom: -16px;}
					}
					.item_dot { background: #FF6A3F; left: 20px; bottom: 0;}
				}
				.st_8 {
					top: 299px; left: 357px; animation-delay:4s;
					.item_text {
						background: #9C5DD5; top: 0;
						&:after {border-top-color: #9C5DD5; right: 20px; bottom: -16px;}
					}
					.item_dot { background: #A239FF; right: 20px; bottom: 0;}
				}
			}
		}
		.content_wrap {
			width: 1200px; margin: 0 auto; position: relative; z-index: 100; top: -136px;
			.num_list {
				width: 100%; height: auto; padding: 20px 0 0 0; background: #fff; box-shadow:0px -15px 80px 0px rgba(0,0,0,0.07);
				.item {
					width: 25%; height: 50px; float: left; padding: 0 0 0 20px; border-right: 1px solid #eee; margin-bottom: 30px; text-align: left; position: relative;
					&:nth-child(4) {border-right: none;}
					.title {font-size: 13px; color: #666;}
					.num_line {
						width: 100%; line-height: 23px; text-align: left; margin-top: 10px; margin-bottom: 2px;
						.num	{
							font-size: 20px; color: #333; display: inline-block; vertical-align: middle; font-family: 'ArialMT';
							&:hover {color: #2F80F6;}
						}
						.blue {color: #2F80F6;}
						.up {display: inline-block; height: 16px; line-height: 16px; padding: 0 5px; background: #36AF47; color: #fff; font-size: 12px; margin-left: 5px; vertical-align: middle;}
					}
					.link {
						font-size: 12px; color: #999; cursor: pointer;
						&:hover {color: #3576FF;}
					}
					.info {font-size: 12px; color: #999; margin-right: 30px;}
				}
				.item_b {margin-bottom: 20px;}
				.type_lab {
					width: 0; height: 0; border: 42px solid transparent; border-left-color: #36AF47; position: absolute; right: -42px; top: -42px; transform: rotate(-45deg);
					span {position: absolute; left: -36px; top: -10px; color: #fff; transform: rotate(90deg); font-size: 12px; }
				}
			}
			.list_wrap {
				width: 100%; height: auto; margin-top: 30px;
				.list_box {
					width: 380px; float: left; margin-right: 30px; border: 1px solid #eee;
					&:last-child {margin-right: 0;}
					.title_box {
						height: 40px; line-height: 40px; padding: 0 20px; border-bottom: 1px solid #f1f1f1;
						.txt {font-size: 14px; color: #333; float: left; font-weight: 600;}
						.more {
							font-size: 12px; color: #999; float: right; cursor: pointer;
							&:hover {color: #333;}
						}
					}
					.company_wrap {
						.item {
							height: 49px; padding: 0 20px; border-bottom: 1px solid #f1f1f1;
							&:last-child {border-bottom: none;}
							.lef {
								width: 180px; height: 48px; line-height: 48px; float: left;
								.company {font-size: 13px; color: #333; display: inline-block; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
							}
							.rig {
								width: 150px; height:49px; line-height: 49px; float: right; text-align: right;
								.statu {font-size: 13px; color: #333; width: 80px; display: inline-block;}
								.time {font-size: 13px; color: #333; margin-left: 10px; width: 60px; display: inline-block;}
							}
						}
					}
				}
			}
			.footer {color: #bbb; font-size: 12px; padding: 20px 0; text-align: center;}
		}
	}
  
</style>
