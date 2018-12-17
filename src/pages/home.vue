<template>
  <div class="home_page">
		<pub-header @changeMenu="getSecondMenuFn" ></pub-header>
		<div class="content_center_wrap">
			<div class="nav_lef">
				<div class="nav_list">
					<p class="item" v-for="(item, index) in cMenusData" :class="{'active': item.active}" :key="index" @click="changeMenuFn(item)">
						<i class="icon iconfont" :class="item.icon"></i>
						<span class="nav_name">{{ item.name }}</span>
					</p>
				</div>
				<div class="info_box">
					<div class="phone"><img src="~assets/img/icon/phone.png" alt=""></div>
					<p class="email">www.baidu.com</p>
					<p class="tell">88888888</p>
				</div>
			</div>
			<div class="content_rig">
				<div class="content_wrap" id="content_wrap">
					<!-- 用于长列表时翻页滚动到顶部定位 -->
					<div id="anchor" style="height: 0;margin: 0;"></div>
					<router-view></router-view>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import pubHeader from 'components/public/header.vue'
	export default {
		components: {
			pubHeader
		},
		data() {
			return {
				menusData: [],  //一级路由
				cMenusData: [],
				activePath: '',
				theRoute: {},
				isSuper: 1,  //默认管理员
				activeIndex: 0, //以及路由高亮的下标
			}
		},
		mounted () {
			this.isSuper = this.$storage.get('isSuper');
		},
		methods: {
			// 得到二级路由
			getSecondMenuFn (data) {
				console.log(data);
				this.cMenusData = data;
			},
			// 跳转路由
			changeMenuFn (item) {
				this.$router.push({path: item.access});
			},
		},
		// watch: {
    //   $route(to, from) {
    //     this.updateCurMenuFn(to);
    //   }
    // }
	}
</script>


<style lang="scss">
  .home_page {
  	position: absolute; width: 100%; height: 100%; overflow: hidden; background: #f8f8f8;
		.content_center_wrap {
			position: absolute; top: 50px; bottom: 0; width: 100%;
			.nav_lef {
				width: 200px; float: left; height: 100%; background: #222; 
				.nav_list {
					width: 100%; height: 100%; overflow-y: auto;
					.item {
						padding-left: 20px; height: 46px; line-height: 46px; cursor: pointer;
						img {width: 16px; height: 16px; opacity: 0.5;}
						.icon {font-size: 20px; color: #fff; float: left; opacity: 0.5;}
						.nav_name { font-size: 13px; color: #fff; margin-left: 10px; float: left; opacity: 0.5; vertical-align: middle; display: inline-block; max-width:140px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
						&:hover {
							background: rgba(255,255,255,.1);
							.icon {opacity: 1;}
							.nav_name {opacity: 1;}
						}
					}
					.active {
						background:linear-gradient(270deg,rgba(66,114,255,1) 0%,rgba(35,124,255,1) 100%);
						.icon {opacity: 1;}
						.nav_name { opacity: 1;}
					}
				}
				.info_box {
					width: 160px; height: 140px; position: absolute; bottom: 20px; left: 20px; background: #2B2B2F; border-radius: 4px;
					.phone {
						position: absolute; left: 50%; margin-left: -30px; top: -20px; width: 60px; height: 60px; line-height: 60px; text-align: center; border-radius: 50%; background: #222;
						img {width: 24px; height: 24px;}
					}
					.email {width: 100%; color: #fff; font-size: 14px; text-align: center; margin-top: 52px; margin-bottom: 10px;}
					.tell {width:100%; text-align: center; font-size: 14px; color: #9EA0A5; }
				}
				.nav_list {
					width: 100%; height: calc(100% - 230px); overflow-y: auto;
					.item {
						padding-left: 20px; height: 46px; line-height: 46px; cursor: pointer;
						img {width: 16px; height: 16px; opacity: 0.5;}
						.icon {font-size: 20px; color: #fff; float: left; opacity: 0.5;}
						.nav_name { font-size: 13px; color: #fff; margin-left: 10px; float: left; opacity: 0.5; vertical-align: middle; display: inline-block; max-width:140px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
						&:hover {
							.icon {opacity: 1;}
							.nav_name {opacity: 1;}
						}
					}
					.active {
						background:linear-gradient(270deg,rgba(66,114,255,1) 0%,rgba(35,124,255,1) 100%);
						.icon {opacity: 1;}
						.nav_name { opacity: 1;}
					}
				}
				.info_box {
					width: 160px; height: 140px; position: absolute; bottom: 20px; left: 20px; background: #2B2B2F; border-radius: 4px;
					.phone {
						position: absolute; left: 50%; margin-left: -30px; top: -20px; width: 60px; height: 60px; line-height: 60px; text-align: center; border-radius: 50%; background: #222;
						img {width: 24px; height: 24px;}
					}
					.email {width: 100%; color: #fff; font-size: 14px; text-align: center; margin-top: 52px; margin-bottom: 10px;}
					.tell {width:100%; text-align: center; font-size: 14px; color: #9EA0A5; }
				}
			}
			.content_rig {
				float: left; height: 100%; position: absolute; left: 200px; right: 0;
				.content_wrap {
					overflow: auto; position: absolute;top: 0; bottom: 0; left: 0; right: 0;
					.copy_roght {color: #bbb; font-size: 12px; padding: 15px 0 20px 20px;}
				}
			}
		}
  }
  .ant-popover-content {
		.ant-btn {line-height: 28px;}
	}
</style>
