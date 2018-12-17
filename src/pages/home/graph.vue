<template>
  <div class="general_page clearfix" @click="hideListFn">

		<div class="graph_box">

			<div class="total_graph" >
				<div class="select_input" @click.stop="newListShow = true">
					<a-checkbox
						:indeterminate="indeterminate1"
						@change="onCheckAllChange1"
						:checked="checkAll1"
					>
					新认定且符合申报
					</a-checkbox>
					<div class="option_list" v-show="newListShow">
						<a-checkbox-group :options="plainOptions1" v-model="checkedList1" @change="onChange1" />
					</div>
				</div>

				<div class="select_input" @click.stop="oldListShow = true">
					<a-checkbox
						:indeterminate="indeterminate2"
						@change="onCheckAllChange2"
						:checked="checkAll2"
					>
					已获评
					</a-checkbox>
					<div class="option_list" v-show="oldListShow">
						<a-checkbox-group :options="plainOptions2" v-model="checkedList2" @change="onChange2" />
					</div>
				</div>

				<div class="select_box" v-if="isSuper">
					<a-select defaultValue="单街道查看" @change="handleChange">
						<a-select-option value="all" >全选</a-select-option>
						<a-select-option :value="item" v-for="(item, index) in streetList" :key="index">{{ item }}</a-select-option>
					</a-select>
				</div>

				<div id="graph_container" class="graph_container" ></div>
			</div>
			<div class="company_graph" >
				<div class="company_item">
					<p class="title">GJZDPY企业</p>
					<div class="graph">
						<div id="state_graph" class="state_graph"></div>
					</div>
				</div>
				<div class="company_item">
					<p class="title">GGXFP企业</p>
					<div class="graph">
						<div id="great_graph" class="state_graph"></div>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import HighCharts from 'highcharts'
	import Filters from 'utils/filters'
	let options = {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道', '闸弄口街道'],
		},
		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: ''
			},
			gridLineColor: '#f1f1f1'
		},
		legend: {
			enabled: false
		},
		colors: ['#ddd', '#FF5722', '#ddd', '#FF9802'],
		tooltip: {
			formatter: function () {
				return '<b>' + this.x + '</b><br/>' +
					this.series.name + ': ' + this.y + '<br/>' +
					'总量: ' + this.point.stackTotal;
			}
		},
		plotOptions: {
			series: {
				type: 'column',
				stacking: 'normal',
				groupPadding : 0.1, //两个柱子之间的距离
				pointWidth: 9,  //柱子的宽度
				borderRadius: 4,  //圆角
			}
		},
		series: [{
			name: '新认定且符合国家申报条件的企业',
			data: [1],
			stack: 2
		}, {
			name: '已获评国家高新技术企业',
			data: [2],
			stack: 2
		}, {
			name: '新认定且符合省科申报条件的企业',
			data: [3],
			stack: 1 // stack 值相同的为同一组
		}, {
			name: '已获评省科技型企业',
			data: [4],
			stack: 1
		}]
	}
	let option1 = {
		chart: {
			zoomType: 'x'
		},
		title: {
			text: ''
		},
		subtitle: {},
		xAxis: {
			categories: ['2018', '2019', '2020']
		},
		tooltip: {
			dateTimeLabelFormats: {
				millisecond: '%H:%M:%S.%L',
				second: '%H:%M:%S',
				minute: '%H:%M',
				hour: '%H:%M',
				day: '%Y-%m-%d',
				week: '%m-%d',
				month: '%Y-%m',
				year: '%Y'
			}
		},
		yAxis: {
			title: {
				text: ''
			},
			gridLineColor: '#fff'
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1
					},
					stops: [
						[0, HighCharts.getOptions().colors[0]],
						[1, HighCharts.Color(HighCharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					radius: 2
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},
		series: [{
			type: 'area',
			name: '企业数量',
			data: [90, 100, 140]
		}]
	}

	const plainOptions = ['国家高新技术企业', '市级高新技术企业', '省级科技型中小企业', '杭州市专利试点企业', '杭州市专利示范企业', '省级高新技术企业研究开发中心', '市级高新技术企业研究开发中心', '省级企业技术中心', '市级企业技术中心', '浙江省重大科技计划项目', '杭州市重大科技计划项目', '市科技型初创企业培育工程']
	const colorList = ['#FFC939', '#FF9D39', '#FF6639', '#FF3939', '#C739FF', '#A239FF', '#7F39FF', '#5E39FF','#3966FF', '#3995FF', '#39BEFF', '#62C5CF']
	const streetList = ['闸弄口街道', '凯旋街道', '采荷街道', '四季青街道', '笕桥街道', '彭埠街道', '钱塘智慧城', '丁兰街道']
	const plainOptions1 = [
		{name:'国家高新技术企业', color:'#FFC939'},
		{name:'市级高新技术企业', color: '#FF9D39'},
		{name: '省级科技型中小企业', color: '#FF6639'},
		{name: '杭州市专利试点企业', color: '#FF3939'},
		{name: '杭州市专利示范企业', color: '#C739FF'},
		{name: '省级高新技术企业研究开发中心', color: '#A239FF'},
		{name: '市级高新技术企业研究开发中心', color: '#7F39FF'},
		{name: '省级企业技术中心', color: '#5E39FF'},
		{name: '市级企业技术中心', color: '#3966FF'},
		{name: '浙江省重大科技计划项目', color: '#3995FF'},
		{name: '杭州市重大科技计划项目', color: '#39BEFF'},
		{name: '市科技型初创企业培育工程', color: '#62C5CF'},
	]
	const defaultCheckedList = ['国家高新技术企业', '市级高新技术企业', '省级科技型中小企业']
	import mockData from './data/graph.js'
	export default {
		data() {
			return {
				showBox: true,  //展示概况
				checkedList1: defaultCheckedList,
				checkedList2: defaultCheckedList,
				checkedListData1: [],
				checkedListData2: [],
				indeterminate1: true,
				indeterminate2: true,
				checkAll1: false,
				checkAll2: false,
				plainOptions1: plainOptions,
				plainOptions2: plainOptions,
				newListShow: false,  //新认定列表
				oldListShow: false,  //已获评
				categories: [], //街道名
				chrtDataList: [],  //图标列表数据
				streetList: streetList, //街道列表
				selectStreet: 'all',
				selectStreetObj: {},  //选择的街道数据

				totalObj: {},
				headStatisticsData: {},  //培育库概况
				ggCultivateOverview: {},  //国高重点培育企业
				ggReviewOverview: {},  //国高需复评企业
				ggygOverview: {},  //国高预估
				skygOverview: {},  //省科预估
				sgygOverview:{},  //市高预估
				options: options,
				visible: false,
				modalTitale: '',
				dateNow: '',
				isSuper: 1,  //默认管理员
				loading: false,
			}
		},
		mounted () {
			this.overviewFn();   //查询概览;
			this.gerChartDataFn();  //条形图信息
		},
		methods: {
			handleScroll (e) {
				let dom_ = document.querySelector('#content_wrap');
				let box_ = document.querySelector('.ant-select-dropdown') 
				let scrollTop = dom_.pageYOffset || dom_.scrollTop;
				if (scrollTop > 0 && box_) {
					box_.style.display = 'none';
				}
			},
			handleChange (v) {
				this.selectStreet = v;
				for (let index = 0; index < this.chrtDataList.length; index++) {
					const element = this.chrtDataList[index];
					if(element.streetName == v){
						this.selectStreetObj = element;
					}
				}
				this.matchDataFn();  //匹配选择的筛选项
			},
			hideListFn () {
				this.newListShow = false;
				this.oldListShow = false;
			},
			onChange1 (checkedList) {
				this.indeterminate1 = !!checkedList.length && (checkedList.length < plainOptions.length)
				this.checkAll1 = checkedList.length === plainOptions.length;
				this.matchDataFn();  //匹配选择的筛选项
			},
			onCheckAllChange1 (e) {
				this.newListShow = true;
				Object.assign(this, {
					checkedList1: e.target.checked ? plainOptions : [],
					indeterminate1: false,
					checkAll1: e.target.checked,
				})
				this.matchDataFn();  //匹配选择的筛选项
			},
			onChange2 (checkedList) {
				this.indeterminate2 = !!checkedList.length && (checkedList.length < plainOptions.length)
				this.checkAll2 = checkedList.length === plainOptions.length;
				this.matchDataFn();  //匹配选择的筛选项
			},
			onCheckAllChange2 (e) {
				this.oldListShow = true;
				Object.assign(this, {
					checkedList2: e.target.checked ? plainOptions : [],
					indeterminate2: false,
					checkAll2: e.target.checked,
				})
				this.matchDataFn();  //匹配选择的筛选项
			},

			// 组装配置文件 （管理员）
			getOptionByAdminFn () {
				function getIndex (totalArr, item) {
					return totalArr.indexOf(item)
				}
				this.checkedListData1 = this.checkedList1.map( (data, idx) => {
					return {name: data, data: [], stack: idx, color: '#ddd'}
				})
				this.checkedListData2 = this.checkedList2.map( (data, idx) => {
					return {name: data, data: [], stack: idx, color: colorList[idx]}
				})
				this.categories = [];
				this.chrtDataList.forEach( listItem => {
					this.categories.push(listItem.streetName);
					this.checkedListData1.forEach((info, idx) => {
						let index_ = getIndex(plainOptions, info.name);
						info.data.push(listItem.newNum[index_]);
					})
					this.checkedListData2.forEach((info, idx) => {
						let index_ = getIndex(plainOptions, info.name);
						info.data.push(listItem.existNum[index_]);
					})
				})
				console.log(this.checkedListData1);
				this.checkedListData1.forEach( ch => {
					ch.name = '新认定-' + ch.name
				})
				this.checkedListData2.forEach( ch => {
					ch.name = '已获评-' + ch.name
				})
				this.checkedListData1.reverse();
				this.checkedListData2.reverse();
				this.options.series = [...this.checkedListData1, ...this.checkedListData2];
				console.log(this.options.series)
			},
			//组装配置文件 （街道）
			getOptionByStreet () {
				this.categories = plainOptions;
				let arr1 = plainOptions.map( item => { return {name: item, data: 0} });
				let arr2 = plainOptions.map( item => { return {name: item, data: 0} });;
				for (let i = 0; i < arr1.length; i++) {
					const item = arr1[i];
					for (let j = 0; j < this.checkedList1.length; j++) {
						const info = this.checkedList1[j];
						if (item.name == info) {
							item.data = this.selectStreetObj.newNum[i]   
							break
						}
					}
				}
				for (let i = 0; i < arr2.length; i++) {
					const item = arr2[i];
					for (let j = 0; j < this.checkedList2.length; j++) {
						const info = this.checkedList2[j];
						if (item.name == info) {
							item.data = this.selectStreetObj.existNum[i]  
							break
						}
					}
				}
				let data1 = arr1.map( item => {return item.data});
				let data2 = arr2.map( item => {return item.data});
				this.options.series = [];
				this.options.series[0] = {
					name: '新认定且符合申报', data: data1, stack: 1  
				}
				this.options.series[1] = {
					name: '已获评', data: data2, stack: 1
				}
				this.options.xAxis.labels = {};
				this.options.xAxis.labels.rotation = -45;
				console.log(this.options.series)
			},
			// 匹配已选择数据
			matchDataFn () {
				if (this.isSuper || this.selectStreet == 'all') {
					this.getOptionByAdminFn();  //组装配置文件 （管理员）
				}
				if (!this.isSuper || this.selectStreet != 'all') {
					this.getOptionByStreet();  //组装配置文件 （街道）
				}
				this.totalGraphFn();  //绘制
			},
			// 查询条形信息图
			async gerChartDataFn () {
				try{
					this.chrtDataList = mockData.cpOverviewChart.list;
					this.matchDataFn();  //匹配选择的筛选项
				}
				catch(e){}
			},
			totalGraphFn () {
				this.options.xAxis.categories = this.categories;
				if (this.isSuper) {
					let wid_ = 4; //柱状体宽度
					let padding_ = 0.1;  //柱子间距离
					let len_ = Math.ceil(this.options.series.length / 2);
					if(len_<3){
						wid_ = 14;
						padding_ = 0.1;
					}
					else if (len_ >=3 && len_ <12) {
						wid_ = 8;
						padding_ = 0.8;
					}
					if (len_ == 12 || this.options.series.length >= 12){
						wid_ = 4;
						padding_ = 0.8;
					}
					this.options.plotOptions.series.pointWidth = wid_;
					this.options.plotOptions.series.groupPadding = padding_;
				}
				else{
					this.options.plotOptions.series.pointWidth = 32;
				}
				console.log(this.options)
				HighCharts.chart('graph_container', this.options);
			},
			// 查看列表
			goListFn (type) {
				let url = `/home/list/list?type=${type}`;
				this.$router.push(url);
			},
			// 国高预估图表
			goGgDetailFn (type) {
				this.$router.push(`nationalTech/nationalTech?tab=3&selectType=${type}`)
			},
			//省科预估图表
			goSkDetailFn () {
				this.$router.push(`provincialTech/provincialTech?tab=3`)
			},
			//市科预估图表
			goShiDetailFn () {
				this.$router.push(`cityTech/cityTech`)
			},
			pathTo(path, query = {}) {
	  		this.$router.push({path, query});
	  	},
			showModalFn () {
				this.dateNow = new Date().getTime();
				let time = Filters.pubFilters.filters.dateFormat(new Date().getTime());
				this.modalTitale = `截止时间：${time}更新如下数据:`;
				// this.visible = true;
				this.overviewFn();   //查询概览;
				this.gerChartDataFn();  //条形图信息
			},
			handleOk(e) {
	      console.log(e);
	      this.visible = false
	    },
			// 查询概览（陈局）
			async overviewFn () {
				this.loading = true;
				try {
					this.totalObj = mockData.cpOverview;
					this.loading = false;
					this.headStatisticsData = this.totalObj.headStatisticsData;
					this.ggCultivateOverview = this.totalObj.ggCultivateOverview;  //国家重点
					this.ggReviewOverview = this.totalObj.ggReviewOverview;  //国高需复评
					this.ggygOverview = this.totalObj.ggygOverview;  //国高需复评
					this.skygOverview = this.totalObj.skygOverview;  //国高需复评
					this.sgygOverview = this.totalObj.sgygOverview;  //市高预估
					this.littleGraphFn('state_graph', this.ggCultivateOverview, option1);  //绘制小图（国家重点）
					this.littleGraphFn('great_graph', this.ggReviewOverview, option1);  //绘制小图（国高需复评）
				}
				catch (e){}
			},
			// 绘制小图
			littleGraphFn (id, dataObj, option_) {
				let option = option_;
				option.series[0].data = [];
				for (let key in dataObj) {
					if (dataObj.hasOwnProperty(key)) {
						option.series[0].data.push(dataObj[key])
					}
				}
				HighCharts.chart(id, option);
			},
		},
		filters: {
			dateFormat: Filters.pubFilters.filters.dateFormat,
			applyStatus: Filters.statusFilters.filters.applyStatus,
			result: Filters.statusFilters.filters.result
		}
	}
</script>


<style lang="scss">
  .general_page {
  	padding: 16px 15px 0 15px;
  	.loading_box {
  		position: absolute; z-index: 10; width: 100%; height: 100%; background: rgba(255,255,255,.3); text-align: center; padding-top: 300px;
  	}
  	.graph_box {
  		width: 1115px; min-height: 100%; float: left;
  		.total_num {
				width: 100%; height: auto; background: #fff; position: relative;
				.more_box {
					width: 60px; height: 10px; line-height: 10px; cursor: pointer; background: #fff; border-radius:0px 0px 52px 52px; position: absolute; left: 50%; bottom: -10px; margin-left: -30px; text-align: center; z-index: 10; background:url(~assets/img/icon/up.png) no-repeat;
				}
				.box_down {background:url(~assets/img/icon/down.png) }
  			.total_title {
  				width: 100%; height: 40px; line-height: 40px; border-bottom: 1px solid #F1F1F1; padding-left: 20px;
  				.text {font-size: 14px; color: #333; font-weight: 600;}
  				.time {font-size: 12px; color: #3576FF; margin-left: 25px;}
  				.anticon {color: #3576FF; margin-left: 10px; cursor: pointer;}
  			}
  			.num_list {
  				width: 100%; height: 100px; border-bottom: 1px solid #f5f5f5; position: relative;
					&:last-child {border-bottom: none;}
  				.item {
  					width: 20%; height: 100%; float: left; padding: 15px 0 0 15px; text-align: left; position: relative;
  					.title {font-size: 12px; color: #666;}
  					.num_line {
  						width: 100%; line-height: 23px; text-align: left; margin-top: 10px; margin-bottom: 2px;
							.num	{font-size: 20px; color: #333; display: inline-block; vertical-align: middle; font-family: 'ArialMT'}
  						.up {display: inline-block; height: 16px; line-height: 16px; padding: 0 5px; background: #36AF47; color: #fff; font-size: 12px; margin-left: 5px; vertical-align: middle;}
  					}
  					.link {
  						font-size: 12px; color: #999; cursor: pointer;
  						&:hover {color: #3576FF;}
  					}
  					.info {font-size: 12px; color: #999; margin-right: 30px;}
  				}
					.type_lab {
						width: 0; height: 0; border: 42px solid transparent; border-left-color: #36AF47; position: absolute; right: -42px; top: -42px; transform: rotate(-45deg);
						span {position: absolute; left: -36px; top: -8px; color: #fff; transform: rotate(90deg); font-size: 12px; }
					}
  			}
				.b_green {
					border-left: 4px solid #36AF47;
					.type_lab {border-left-color: #36AF47;}
				}
				.b_yellow {
					border-left: 4px solid #FF9639;
					.type_lab {border-left-color: #FFC86D;}
				}
				.b_red {
					border-left: 4px solid #F64744;
					.type_lab {border-left-color: #FF6260;}
				}
				.b_gray {
					border-left: 4px solid #ddd;
				}
  			.street_num {
  				.item {width: 25%;}
  			}
  		}
  		.total_graph {
				width: 100%; height: 494px; margin-top: 15px; background: #fff; padding: 20px;
				.select_input {
					width: 224px; height: 32px; line-height: 32px; border:1px solid rgba(0,0,0,0.1); border-radius: 2px; padding: 0 10px; position: relative; float: left; margin-right: 20px; z-index: 1;
					.ant-checkbox-wrapper {
						float: left; font-size: 13px; line-height: 30px;
					}
					.option_list {
						position: absolute; width: 100%; height: auto; border:1px solid rgba(0,0,0,0.1); border-top:none; left: 0; top: 30px; max-height: 380px; overflow-y: auto; padding-top: 10px; background: #fff;
						.ant-checkbox-group-item {
							width: 100%; height: 32px; line-height: 32px; padding: 0 10px;
							span {font-size: 12px;}
						}
					}
				}
				.select_box {
					float: right; width: 224px;
					.ant-select {width: 100%;}
					.ant-select-selection--single {height: 32px; border: 1px solid rgba(0,0,0,0.1);}
					.ant-select-selection__rendered {line-height: 30px;}
					.ant-select-selection-selected-value {color:rgba(0,0,0,0.25);}
				}
  			.graph_container {padding: 52px 0 40px 0;}
  		}
  		.street_total_graph {
  			width: 550px; height: 590px; float: left; margin-right: 15px;
  			.graph_container {height: 100%;}
  		}
  		.company_graph {
  			width: 100%; height: 288px; margin-top: 15px;
  			.company_item {
  				width: 550px; height: 100%; float: left; margin-right: 15px; background: #fff;
  				&:last-child {margin-right: 0;}
  				.title {height: 40px; line-height: 40px; padding-left: 20px; font-size: 14px; color: #333; font-weight: 600; border-bottom: 1px solid #f1f1f1; box-sizing: content-box;}
  				.graph {
  					width: 100%; height: 246px;
  					.state_graph {padding: 20px; height: 100%;}
  				}
  			}
  		}
  		.street_company_graph {
  			width: 550px; float: left;
  			.company_item {
  				margin-bottom: 15px; margin-right: 0;
  				&:last-child {margin-bottom: 0;}
  			}
  		}
  	}
  	.list_box {
  		max-width: 540px; float: left; margin-left: 15px;  position: relative;
			&:first-child {margin-top: 0;}
  		.list_wrap {
  			width: 100%; height: auto; background: #fff;
  			.title_box {
  				height: 40px; line-height: 40px; padding: 0 20px; border-bottom: 1px solid #f1f1f1;
  				.txt {font-size: 14px; color: #333; float: left; font-weight: 600;}
  				.more {font-size: 12px; color: #999; float: right; cursor: pointer;}
  			}
  			.state_wrap {
  				width: 100%; height: auto;
  				.item {
  					padding: 0 20px; height: 66px; line-height: 66px; border-bottom: 1px solid #f1f1f1; cursor: pointer;
  					&:last-child {border-bottom: none;}
  					.lef {
  						height: 100%; float: left; max-width: 160px;
  						.lab {width: 36px; height: 36px; display: inline-block; line-height: 36px; background: #3576FF; border-radius: 50%; font-size: 14px; color: #fff; text-align: center;}
  						.year {font-size: 13px; color: #666; margin-left: 10px;}
  					}
  					.rig {
  						width: 300px; float: right; height: 66px; text-align: right;
  						.range_num {font-size: 14px; color: #333; margin-right: 10px; display: inline-block;}
  						.up_num {
  							height: 20px; line-height: 18px; padding: 0 10px; border-radius: 1px; display: inline-block; background: #E2EBFF; border: 1px solid #BCD1FF; color: #3576FF; font-size: 12px; text-align: center; position: relative;
								&:before {content:''; width: 0; height: 0; border: 4px solid transparent; border-right-color: #BCD1FF; position: absolute; left: -8px; top: 50%; margin-top: -4px;}
								&:after {content:''; width: 0; height: 0; border: 4px solid transparent; border-right-color: #E2EBFF; position: absolute; left: -7px; top: 50%; margin-top: -4px;}
  						}
  					}
  				}
  				.item_total {
  					height: 48px; line-height: 48px; padding: 0 20px;
  					.total {font-size: 13px; color: #333; text-align: right; }
  				}
  			}
  			.company_wrap {
  				.item {
  					height: 48px; height: 48px; cursor: initial;
  					.lef {
  						line-height: 48px;
							.company {font-size: 13px; color: #333; display: inline-block; width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
  					}
  					.rig {
  						 width: 260px; height:48px; line-height: 48px;
							.statu {font-size: 13px; color: #333; margin-right: 20px; width: 80px; display: inline-block;}
  						.time {font-size: 13px; color: #999; width: 80px; display: inline-block;}
  					}
  				}
  			}
  			.prowincy_wrap {
  				.item {
  					.lef {
							.lab {background: #F5A623;}
							.lab_green {background: #36AF47;}
  					}
  					.rig {
  						.up_num {
  							background: #FFF2DC; border: 1px solid #FFE3B4; color: #F5A623;
  							&:before {border-right-color: #FFE3B4;}
  							&:after {border-right-color: #FFF2DC;}
  						}
  					}
  				}
  			}
  		}
			.empty_box {
				width: 100%; text-align: center; position: absolute; top: 50%; margin-top: -64px;
				img {width: 140px; height: 140px;}
				.text {font-size: 12px; color: #999; margin-top: 10px; text-align: center;}
			}
  	}
  	.list_box_company {
  		height: 468px; background: #fff; overflow: hidden;
		}
		.survey_company {height: 288px;}
  }
  @media screen and (min-width: 1920px) {
  	.general_page {
			min-width: 1650px;
			.list_box {
				width: 540px;
				.list_wrap {
					.company_wrap {
						.item {
							.lef {max-width: 220px;}
						}
					}
				}
			}
		}
  }
	@media screen and (max-width: 1919px) and (min-width: 1366px) {
		.general_page {
			min-width: 1700px;
			.list_box {
				max-width: 540px; width: 540px;
			}
			.survey_company {height: 290px;}
		}
	}
	@media screen and (max-width: 1366px) {
		.general_page {
			width: 1166px;
			.list_box {
				max-width: 550px; width: 550px;
				.list_wrap_top {margin-top: 15px;}
			}
			.list_box_data {margin-left: 0;}
			.list_box_company {margin-left: 15px; height: 340px; background: #fff; height: 220px;}
			.survey_company {height: 227px;}
		}
	}
	.modal_box {
		.ant-modal-title {font-weight: bold;}
		.ant-modal-header {border-bottom: none; padding: 20px 0 10px 20px;}
		.ant-modal-body {
			padding: 0 20px 20px 20px;
			.data_box {
				margin-bottom: 20px;
				&:last-child {margin-bottom: 0;}
				.item {
					width: 100%; font-size: 14px; color: #333; margin-bottom: 10px;
					.num {color: #36AF47; }
				}
			}
		}
  }
  .ant-popover-inner {
  	.ant-btn-sm {border-radius: 2px;}
  }
</style>
