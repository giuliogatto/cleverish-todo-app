# Clever(ish) Javascript ToDo App with Neural Network sentiment analysis



Machine Learning may still sound an intimidating  business but in 2019 it's a much simpler subject than the way a lot of the past literature presented it.

You don't need an Algebra PHD or to be a Calculus expert to use it, and this is all thanks to the great work that programmers and scientists have done in the last 5/6 years. In this period of time great libraries and frameworks have been built, abstracting the complexity of algorithms, and making it ever so easy to jump-start a project. 

Mind you, I am not saying that a good knowledge of Linear Equations, Derivatives, Integrals, Matrices etc is useless: I am just stating that you can approach Machine Learning without a deep understanding of its internals, simply treating it as a 'black box' initially, and with time and experience you can expand on your knowledge in order to become proficient with it.

I don't claim to be an expert at all myself, but I have been trying a few things since 2010, when I first was interested in the subject and wanted to build a synthetic voice using Natural Language Processing.
The project failed miserably, mostly because it was a very complex involving multiple steps but also because back in 2010 it was very difficult to find related information. Most of the knowledge and the available software were produced by universities, and documentation was scarce: I remember taking me a whole month to compile all the scripts needed to train a model and make them work the way I wanted.
Everything was slow and painful, and my desktop computer wasn't powerful enough for training even the simplest of models.

Fast forward to 2019 and not only we have wonderful open source python libraries like Tensorflow, Caffe etc. but we have also Javascript libraries that allow us to tackle small Machine Learning problems in the browser. 
The implications of this acceleration are huge, especially with Web Assembly becoming more and more of a reality. Consider also Moore's law and the fact that processing power is  getting cheaper and you have a 'perfect storm' . At the center of this storm there's a few main actors and they certainly include: Javascript. 

Obviously Python still offers a far superior list of options in the field, with battle tested libraries like Scikit, Numpy, Tensorflow etc but don't underestimate the Javascript/Node JS community resourcefulness.
Apart from Tensorflow.js, there are quite a few solid libraries like Convnet.js (by Andrej Karpathy who shows a few brilliant examples)  or Natural (very useful for Natural Language Processing) problems. My choice for a simple basic demo App is surely Brain.js which offers a very easy API and very good documentation and examples. 

I am not going into the details of why I chose an LSTM (Long short-term memory) type of Neural Network, there is so much first-rate learning material available on-line for NN theory and examples.
The whole point of this article is to underline how easy it is in 2019 to dive into Machine Learning and start your own projects. 
All the logic for our Neural Network is compacted in these few lines of code:

```
const brain = require("brain.js");
const net = new brain.recurrent.LSTM();
net.train(self.$store.state.trainingdata, {
	iterations: 100,
	erroThresh: 0.011,
	log: true
});
```

I implemented the ToDo App with Vue and VueX, but it can easily be converted to React/Redux.
You can find a live demo in here: https://codesandbox.io/s/rjo0qv5ppn


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
