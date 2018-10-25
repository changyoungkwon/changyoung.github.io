# HTTP header는 왜 존재하는가(10/25)
##### 질문 : http 통신 간에 header는 왜 필요할까? 
생각해보자. http은 client가 서버의 resource에 대한 처리 요청을 위한 프로토콜이다. 서버는 클라이언트로부터 받은 URI와 http verb를 통하여 특정 resource를 client에게 보낼지(GET), 새롭게 추가할지(POST), 수정할지(PUT), 삭제할지(DELETE) 결정한다. 
 아니, 그러면 대체 http header는 왜 필요한거야? 

##### 1. client와 server는 서로 협상한다.
client와 server는 사전에 정의된 api에 의하여 resource를 처리한다. 다르게 말하면 통신을 하지 않은 상태에서 api 말고는 서로에 대해 아는게 없다! 그러면 아래와 같은 문제가 발생할 수 있다. 

1. 내가 자체 개발한 브라우저를 이용해 server에게 http 통신을 통해 초고화질 아이유 사진을 요청하였다. 요청을 받은 서버는 통신 시간을 최대한 단축하기 위하여 초고화질 이미지를 gzip으로 압축하여 클라이언트 브라우저에게 전송하였다. 그러나, 나의 브라우저는 gzip decoding을 지원하지 않았고 나는 초고화질 아이유 사진을 볼 수 없었다. 
2. 내가 개발한 웹 서비스가 국내에서 크게 성공하였다. 해외 서비스를 준비하기 위하여, 웹 페이지 번역을 모두 마쳤다. 그러나, 나는 요청해온 클라이언트가 국가에 있으며, 어떤 언어를 원하는지를 모른다는 사실을 깨달았다. 
 
(1) 사례나, (2) 사례의 경우 모두 URI와 verb의 문제가 아니다. 다만, 클라이언트에서 가능한, 혹은 요구하는 스펙을 서버가 몰랐기에 발생하는 문제였다. 클라이언트는 이 스펙을 서버와 협상하기 위하여 header를 사용한다(자세한 내용은 [content negotiation](https://naver.com) 참조). (1)의 경우에는 accept-encoding을, (2)의 경우에는 accept-language를 header에 정의한다. 그리고 이러한 http header을 request header라고 부른다. 
 Response는 협상 결과를 header에 담는다. 예를 들어서, 클라이언트가 `accept-encoding:gzip, deflate`라 보내왔다고 가정하자. 이 말인 즉, '서버님, gzip과 deflate 해독이 가능하니 그 중 하나의 encoding 방식을 결정해서 압축, 전송해주세요' 이다. 그렇다면 서버는 뭐라고 보내겠는가? '오냐, 내가 너의 spec은 알겠고 gzip으로 압축했으니 알아서 해독하거라'하고 보내지 않겠는가? 이러한 header를 response header라고 부른다. 실제로 encoding 방식을 담고 있는 헤더는 content-encoding이다. 

##### 2. client는 server에게 보내는 content의 meta-data를 첨부해줄 의무가 있다. 
2는 더 간단하다. 내가 POST, 혹은 PUT request를 보내기 위해서 body에 데이터를 담았다. 안타깝게도 통신으로 보내지는 데이터들은 음악이었든, 이미지였든 모두 0과 1의 배열로 보내진다. 따라서 서버에게 '야, 사실 내가 보낸거 이런 파일이야'라고 알릴 필요가 있다. 이러한 header를 content header라고 한다.
 이에 해당하는 헤더는 두 개이다. `content-type`과 `content-length`이다. `content-type`은 말 그대로 해당 컨텐트가 어떤 형식을 가지는가를 나타내며 보편적인 파일을 포함한 form을 통한 전송의 경우에는 `multi-part/form-data`를, text로만 이루어진 데이터의 경우에는 `application/x-www-urlencoded`을 사용한다.

이런 의문도 들 수 있겠다. '아니, 음악이면 mp3 파일이라고 얘기해줘야 하는거 아니야? multi-part/form-data라고 전송하면 서버가 어떻게 알아?' 걱정할 필요 없다. 실제 전송 패킷을 살펴보면 form 내부에서 각 input의 형식을 알아내서 각 input마다 `content-type`을 지정해준다(이런 형식은 `MIME-TYPE`으로 규격화되어있다). 

##### 그 외에
 이 외에도 general header가 있다. 예를 들어서 proxy를 거쳐서 요청을 하기 위한, `via`라든지. 근데 일단 크게 두 가지만 알고가자 오늘은. 졸립다. 
