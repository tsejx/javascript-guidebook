---
nav:
  title: 设计模式
  order: 10
group:
  title: 结构型
  order: 3
title: 外观模式
order: 5
---

# 外观模式

外观模式（Facade Pattern）是一种结构型设计模式，它提供了一个统一的接口，用于访问子系统中的一群接口。外观模式定义了一个高层接口，使得子系统更容易使用。

外观模式的主要目的是简化客户端与复杂系统之间的交互，通过引入一个外观类，隐藏了系统的复杂性，使得客户端只需与外观类交互，而无需直接与子系统中的各个组件打交道。这有助于减少客户端与子系统之间的依赖关系，提高了系统的灵活性和可维护性。

外观模式涉及到以下几个角色：

1. **外观（Facade）**： 提供了一个高层次的接口，该接口使用了子系统中的一群接口，使得子系统更容易使用。
2. **子系统（Subsystems）**： 由多个类组成，实现了系统的各个功能。外观将客户端请求代理给适当的子系统对象。
3. **客户端（Client）**： 通过外观接口与子系统交互，而无需直接与子系统的具体实现打交道。

假设有一个音响系统，包含了开启音响、播放音乐和关闭音响等多个步骤，我们可以使用外观模式来简化这个过程：

```typescript
// 子系统 - 音响
class Stereo {
  turnOn() {
    console.log("Stereo is ON");
  }

  playMusic() {
    console.log("Music is playing");
  }

  turnOff() {
    console.log("Stereo is OFF");
  }
}

// 外观
class AudioFacade {
  constructor(stereo) {
    this.stereo = stereo;
  }

  playMusic() {
    this.stereo.turnOn();
    this.stereo.playMusic();
  }

  turnOffMusic() {
    this.stereo.turnOff();
  }
}

// 客户端
const stereo = new Stereo();
const audioFacade = new AudioFacade(stereo);

// 使用外观接口
audioFacade.playMusic();

// 关闭音响
audioFacade.turnOffMusic();
```

在这个示例中，`Stereo` 类是子系统的一部分，包含了音响的各种操作。`AudioFacade` 类是外观类，它提供了一个简化的接口，包含了开启音响和播放音乐的步骤。客户端通过与 `AudioFacade` 类交互，无需直接调用 `Stereo` 的具体方法，从而实现了对子系统的简化访问。