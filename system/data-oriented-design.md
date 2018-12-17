### Data oriented design
> 본 문서는 CppCon2018에서 Stoyan Nikolov의 발표 "[OOP is Dead, Long Live Data-Oriented Design](https://www.youtube.com/watch?v=yy8jQgmhbAU)" 을 요약한 내용입니다.
### 1. 목차
+ 1. 강연자 소개
+ 2. 동기 : Chromimum, 그리고 Webkit을 기반의 개발에서 벗어나 data-oriented design된 자체 브라우저 엔진을 개발하고자 하였다.  
+ 3. 강연 목적 : data-oriented design 기반 시스템 설계.

### 2. What is so wrong with OOP?
 첫째로 monkey-jungle 문제. 즉, 데이터 monkey를 나타내기 위해서 부모관계에 있는, 연산에 당장 사용하지 않을 데이터들을 불러와서 cache를 낭비한다. 
 다른 문제는 feature of hiding state. 각 객체가 가지고 있는 state들로 인한 복잡성 증가(?)
 코드는 performance, scalability, modifiability, testability, 총 4가지 기준으로 평가할 예정. 
 
### 3. Data-oriented design concept
 객체 지향 프로그램과 데이터를 조직화하는 기준이 다르다. 객체 지향 프로그램의 경우 각각의 field가 객체에 속하는 논리적 이유(logical entity)가 존재하였었다.
 반면 DOD는 사용 
 
### 4. 예제를 통한 문제점 지적
+ 4.0. Six unknown classes
+ 4.1. Unclear lifetime semantics
+ 4.2. The hidden state : (1)paying for cache miss, and (2)branch miss prediction 
+ 4.3. Interpolate different types of values via **virtual keyword**
  - (1) allocating all the interpolations
  - (2) data/instruction cache miss
+ 4.4. CSS animations reach out to other systems-coupling
  - calling events
  - setting the value in the DOM element(or tree)

### 5. 
  + 5.1. 데이터를 데이터 연관 operation 횟수를 기준으로 정렬
  + 5.2. Interpolate보다 template를 애용하라. 

적다가 animation과 관련된 부분을 몇 번을 보아도 이해하기 어려워. 다른 영상을 보는 중. Mike Acton, "[Data-Oriented Design and C++](https://www.youtube.com/watch?v=rX0ItVEVjHc)"
