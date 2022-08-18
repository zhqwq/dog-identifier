# 狗品种识别App：Dog Breed Identifier 

Expo 框架是基于 React Native 的 Meta Framework, 使用 Expo 可以简化 React Native 对 IOS/Android/Web 三端的基本配置, 无心智负担的快速开发。  

总体上, 前端框架使用 Expo, 后端框架使用 Python Flask + Gunicorn 容器, 深度学习框架使用 PyTorch 对 ResNet-34 进行迁移学习, 最后部署在 Linux 服务器上提供远程服务。

总共有四个页面：
- 历史记录 Log List：
- 相机拍照 Camera Page（此时使用泡泡马特玩偶代替可爱的狗狗）：
- 拍照预测 Report Page, 在短暂的延迟后响应一个报告, 显示 Top-3 预测概率
- 软件设置 Setting Page, 可以使用 Dark Mode

![image](https://user-images.githubusercontent.com/56614895/185463595-1cdd7252-3fc0-4800-a356-ac1b783b6f2e.png)

## 数据集 Dataset

数据集源自 Kaggle 平台：https://www.kaggle.com/datasets/gpiosenka/70-dog-breedsimage-data-set
![image](https://user-images.githubusercontent.com/56614895/185461003-3f2c155c-2d42-4c97-af54-2608e97b3c28.png)

## 不同网络训练效果比较

![image](https://user-images.githubusercontent.com/56614895/185464238-84cfa09c-b94c-4c90-a61b-8d68b1a677a3.png)
![image](https://user-images.githubusercontent.com/56614895/185464256-d632383a-76ba-4089-a66c-3b53555c4d9a.png)
![image](https://user-images.githubusercontent.com/56614895/185464278-15610984-a16e-427c-9472-c708d606978b.png)
![image](https://user-images.githubusercontent.com/56614895/185464285-cbdc25db-98e2-48f2-abcb-d984b96ca6af.png)

## 随机图片测试

![image](https://user-images.githubusercontent.com/56614895/185464353-069a0512-6d75-4dc9-a825-be267f3d76e5.png)

## Linux 服务器响应

使用 Python Flask + Gunicorn 搭建接口部署 PyTorch ResNet-34 迁移学习模型到 Linux Server

![image](https://user-images.githubusercontent.com/56614895/185461259-496bf849-46e6-4257-be83-6b560ea68498.png)

## 安装依赖与运行

`npm install -g expo-cli`

`expo start`

## 构建安卓apk文件

`npm install -g eas-cli`

`eas build --platform android --profile preview`  

