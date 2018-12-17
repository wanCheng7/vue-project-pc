<template>
  <div class="style_page">
		<div class="item">
			<p class="tit">不规则投影</p>
			<div class="content">
				<div class="shadow_box"></div>
			</div>
		</div>
		<div class="item">
			<p class="tit">角标</p>
			<div class="content">
				<div class="type_lab"> <span>通过</span></div>
				<div class="type_lab fail_lab"> <span>失败</span></div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>


<style lang="scss">
	.style_page {
		margin: 20px; padding: 20px; background: #fff; min-height: 100%;
		.item  {
			width: 300px; height: auto; border: 1px solid #eee; float: left; margin-right: 10px;
			.tit {width: 100%; height: 40px; line-height: 40px; padding-left: 20px; border-bottom: 1px solid #eee; font-size: 14px; color: #333; font-weight: 600;}
			.content {
				padding: 20px; min-height: 200px; position: relative;
				.shadow_box {
					width: 150px; height: 150px; border-radius: 10px; background: #FF6639; box-shadow: 5px 5px 10px rgba(0, 0, 0, .3); position: relative; filter: drop-shadow(5px 5px 5px rgba(0,0,0,.5));
					&:after {content:''; width: 0; height: 0; border: 20px solid transparent; border-left-color: #FF6639; position: absolute; right: -40px; top: 55px; }
				}
				.type_lab {
					width: 0; height: 0; border: 42px solid transparent; border-left-color: #36AF47; position: absolute; right: -42px; top: -42px; transform: rotate(-45deg);
					span {position: absolute; left: -36px; top: -8px; color: #fff; transform: rotate(90deg); font-size: 12px; }
				}
				.fail_lab {
					border-left-color: #FF6260; top: 20px;
				}
			}
		}
	}
</style>
