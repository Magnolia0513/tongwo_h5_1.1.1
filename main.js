import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;


Vue.mixin({
	data(){
		return {
			questionList: [],
			questionList1: [{
				id: 1,
				title: '你睡觉打鼾吗？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、响彻天地'
				}, {
					id: 2,
					content: 'B、有时候会轻微打鼾'
				},{
					id: 3,
					content: 'C、从来不打'
				}]
			},{
				id: 2,
				title: '你喜欢做家务吗？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、整个家都被打扫的一尘不染'
				}, {
					id: 2,
					content: 'B、看不下去了也会动动手'
				},{
					id: 3,
					content: 'C、猪窝也能呆着'
				}]
			},{
				id: 3,
				title: '你会井井有条安排自己的事情吗？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、会用日历/笔记本等工具记录安排自己的生活'
				}, {
					id: 2,
					content: 'B、在脑子里记着，有时候会忘记，但大多数时候还是能记得住的'
				},{
					id: 3,
					content: 'C、经常忘记，需要别人时常提醒才能记住'
				}]
			},{
				id: 4,
				title: '你会经常给自己的朋友联系吗？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、每天都联系，分享生活点滴'
				}, {
					id: 2,
					content: 'B、每周见面发微信联络感情'
				},{
					id: 3,
					content: 'C、每个月联系一次，更新近况'
				},{
					id: 4,
					content: 'D、工作学业繁忙，只能每年联系几次'
				},{
					id: 5,
					content: 'E、从来不联系，彷佛没有这个朋友'
				}]
			},{
				id: 5,
				title: '你聊天时候的话题一般是什么？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、明星趣事，网红八卦'
				}, {
					id: 2,
					content: 'B、自己和身边人最近的生活分享'
				},{
					id: 3,
					content: 'C、国家大事，全球影响'
				},{
					id: 4,
					content: 'D、哲学性的深刻话题'
				},{
					id: 5,
					content: 'E、聊天的时候经常找不到话题'
				}]
			},{
				id: 6,
				title: '你最喜欢吃的东西是什么？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、火锅'
				}, {
					id: 2,
					content: 'B、烤肉'
				},{
					id: 3,
					content: 'C、零食'
				},{
					id: 4,
					content: 'D、蔬菜'
				},{
					id: 5,
					content: 'E、海鲜'
				}]
			},{
				id: 7,
				title: '你希望住在一起的人怎么样？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、对方包揽所有家务'
				}, {
					id: 2,
					content: 'B、对方多做一些，自己也会做一些'
				},{
					id: 3,
					content: 'C、平分所有家务'
				},{
					id: 4,
					content: 'D、自己可以做大部分家务，但是对方必须要有所表示'
				},{
					id: 5,
					content: 'E、“放着我来！” 什么都自己做'
				}]
			},{
				id: 8,
				title: '你周末最喜欢做什么?',
				chose:'',
				options: [{
					id: 1,
					content: 'A、窝在家里什么也不做'
				}, {
					id: 2,
					content: 'B、逛逛街买买东西'
				},{
					id: 3,
					content: 'C、到处找吃的，打卡网红餐厅'
				},{
					id: 4,
					content: 'D、去周边城市短途游'
				},{
					id: 5,
					content: 'E、加班使我快乐'
				}]
			},{
				id: 9,
				title: '你现在的生活中心情是什么样的？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、心情平稳，不喜不悲'
				}, {
					id: 2,
					content: 'B、生活中心情起伏特别大'
				},{
					id: 3,
					content: 'C、大多数情况下不太开心，偶尔有那么一两件值得高兴的事情'
				},{
					id: 4,
					content: 'D、对生活很满意，每天开开心心地'
				}]
			},{
				id: 10,
				title: '你希望未来的生活是什么样的？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、一杯两盏清酒，三四五个好友'
				}, {
					id: 2,
					content: 'B、升职加薪，出任总经理'
				},{
					id: 3,
					content: 'C、儿女双全，母慈子孝'
				},{
					id: 4,
					content: 'D、爱情美满，执子之手，与子偕老'
				},{
					id: 5,
					content: 'E、何以解忧，唯有暴富'
				}]
			}],
			questionList2: [{
				id: 1,
				title: 'TA睡觉打鼾吗？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、响彻天地'
				}, {
					id: 2,
					content: 'B、有时候会轻微打鼾'
				},{
					id: 3,
					content: 'C、从来不打'
				}]
			},{
				id: 2,
				title: 'TA喜欢做家务吗？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、整个家都被打扫的一尘不染'
				}, {
					id: 2,
					content: 'B、看不下去了也会动动手'
				},{
					id: 3,
					content: 'C、猪窝也能呆着'
				}]
			},{
				id: 3,
				title: 'TA会井井有条安排自己的事情吗？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、会用日历/笔记本等工具记录安排自己的生活'
				}, {
					id: 2,
					content: 'B、在脑子里记着，有时候会忘记，但大多数时候还是能记得住的'
				},{
					id: 3,
					content: 'C、经常忘记，需要别人时常提醒才能记住'
				}]
			},{
				id: 4,
				title: 'TA会经常给自己的朋友联系吗？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、每天都联系，分享生活点滴'
				}, {
					id: 2,
					content: 'B、每周见面发微信联络感情'
				},{
					id: 3,
					content: 'C、每个月联系一次，更新近况'
				},{
					id: 4,
					content: 'D、工作学业繁忙，只能每年联系几次'
				},{
					id: 5,
					content: 'E、从来不联系，彷佛没有这个朋友'
				}]
			},{
				id: 5,
				title: 'TA聊天时候的话题一般是什么？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、明星趣事，网红八卦'
				}, {
					id: 2,
					content: 'B、自己和身边人最近的生活分享'
				},{
					id: 3,
					content: 'C、国家大事，全球影响'
				},{
					id: 4,
					content: 'D、哲学性的深刻话题'
				},{
					id: 5,
					content: 'E、聊天的时候经常找不到话题'
				}]
			},{
				id: 6,
				title: 'TA最喜欢吃的东西是什么？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、火锅'
				}, {
					id: 2,
					content: 'B、烤肉'
				},{
					id: 3,
					content: 'C、零食'
				},{
					id: 4,
					content: 'D、蔬菜'
				},{
					id: 5,
					content: 'E、海鲜'
				}]
			},{
				id: 7,
				title: 'TA希望住在一起的人怎么样？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、对方包揽所有家务'
				}, {
					id: 2,
					content: 'B、对方多做一些，自己也会做一些'
				},{
					id: 3,
					content: 'C、平分所有家务'
				},{
					id: 4,
					content: 'D、自己可以做大部分家务，但是对方必须要有所表示'
				},{
					id: 5,
					content: 'E、“放着我来！” 什么都自己做'
				}]
			},{
				id: 8,
				title: 'TA周末最喜欢做什么?',
				chose:'',
				options: [{
					id: 1,
					content: 'A、窝在家里什么也不做'
				}, {
					id: 2,
					content: 'B、逛逛街买买东西'
				},{
					id: 3,
					content: 'C、到处找吃的，打卡网红餐厅'
				},{
					id: 4,
					content: 'D、去周边城市短途游'
				},{
					id: 5,
					content: 'E、加班使我快乐'
				}]
			},{
				id: 9,
				title: 'TA 现在的生活中心情是什么样的？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、心情平稳，不喜不悲'
				}, {
					id: 2,
					content: 'B、生活中心情起伏特别大'
				},{
					id: 3,
					content: 'C、大多数情况下不太开心，偶尔有那么一两件值得高兴的事情'
				},{
					id: 4,
					content: 'D、对生活很满意，每天开开心心地'
				}]
			},{
				id: 10,
				title: 'TA希望未来的生活是什么样的？',
				chose:'',
				options: [{
					id: 1,
					content: 'A、一杯两盏清酒，三四五个好友'
				}, {
					id: 2,
					content: 'B、升职加薪，出任总经理'
				},{
					id: 3,
					content: 'C、儿女双全，母慈子孝'
				},{
					id: 4,
					content: 'D、爱情美满，执子之手，与子偕老'
				},{
					id: 5,
					content: 'E、何以解忧，唯有暴富'
				}]
			}]
		}
	},
	onLoad(data) {
		console.log(data)
		data.share ? this.questionList = this.questionList2 : this.questionList = this.questionList1
	},

	methods: {
		setData: function(obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function(value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function(key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			// this.$forceUpdate();
			isFn(callback) && this.$nextTick(callback);
		}
	}
});

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
