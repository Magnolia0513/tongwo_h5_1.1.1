# 工具

uni-app:一个使用 Vue.js 开发跨平台应用的前端框架，常用来开发小程序、H5等

需要下载HbuilderX来编译运行，微信开发工具应该也可行

代码里还有其他冗余功能，是为之后加上答题发红包功能做准备，现在暂时没有使用，代码主要分布在以下标红处
![image](https://user-images.githubusercontent.com/70499402/113022202-eeb75600-91b6-11eb-8b0f-e7fe6e285c25.png)


# 流程

## 出题
首先，如果用户要进入页面并使用，需要强制调取微信的接口获取用户信息（比如头像，微信名），这个是需要在微信开发上走一些程序和登记的。如果不允许授权应该不显示页面，允许刷新后又重新问一遍是否授权。

初始会进入下面的页面("我要出题”在“去答题”的上面)，现在图上的二维码是带AppStore app id的那个，扫描后可以直接进入AppStore下载页；左上角的圆框是获取的用户头像。
![image](https://user-images.githubusercontent.com/70499402/113016148-c9274e00-91b0-11eb-8776-782fa408e464.png)

点击“我要出题”会进入下面的出题页：选择后就会直接跳转到下一题，没有返回，每答一题都会保存一道题的选择。答题过程中，头像都会在左上角。
![image](https://user-images.githubusercontent.com/70499402/113017397-fa544e00-91b1-11eb-97cd-d6bd45f461ab.png)

一直答题到最后一题（第10题），如果不选择选项，是无法“保存”的。
![image](https://user-images.githubusercontent.com/70499402/113017961-9c743600-91b2-11eb-8d40-0f31792df3fd.png)

## 分享
点击”保存“后，进入”分享“页，点击分享会提示在左上方点击”...“分享。
分享以后把出的题发送给服务器，服务器应该给每一次出的题分配唯一一个uid？被分享的人能得到带这个唯一的一套uid的link题目
![image](https://user-images.githubusercontent.com/70499402/113018713-671c1800-91b3-11eb-8ed5-64557beaa677.png)

## 答题
被分享的人得到带这个唯一的一套uid的link题目，进入答题页，此时“去答题”变成优先选择，在“我要出题的上方；用户信息授权，左上角圆框变成被分享人的头像
![image](https://user-images.githubusercontent.com/70499402/113019898-a72fca80-91b4-11eb-9cf9-71ceae7d9701.png)

进入答题页答题
![image](https://user-images.githubusercontent.com/70499402/113020151-e5c58500-91b4-11eb-8cad-8dbdf8a94e57.png)

同上”出题“。选择完最后一道题后才能点击保存；左上角为被分享人头像
![image](https://user-images.githubusercontent.com/70499402/113020480-389f3c80-91b5-11eb-9e2b-aa9031f0ba9a.png)

保存后，后端计算正确率并给出排名，按答题的时间先后或者正确率的高低排名展示；“分享”和“我要出题”两个button如上功能
![image](https://user-images.githubusercontent.com/70499402/113020970-b3685780-91b5-11eb-9c67-22ff389f7cf3.png)

# 如果用户是非微信端打开

需要考虑要不要打开的页面显示的是一个带这个h5页面link的二维码的图片，类似于这种？需要问问Xin
![image](https://user-images.githubusercontent.com/70499402/113021567-4e613180-91b6-11eb-96ff-24dfff004b78.png)









