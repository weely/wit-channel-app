<script>
	export default {
		globalData: {  
			text: 'demo'
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onPageNotFound: function(){
			console.log('Page Not Found')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
