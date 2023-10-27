@istest
public class BiillApiMockHttpResponseGenerator implements HttpCalloutMock {
	public HttpResponse respond(HttpRequest req) {
		HttpResponse res = new HttpResponse();
		res.setStatusCode(200);
		res.setHeader('Content-Type', 'application/json; charset=UTF-8');
          //'{'+'"bills":[' +'{'+'"billId":'+'"64fe8c72be1ae0125246d285",'+'"accountName":'+'"Account 0",'+' "balance":'+'"$376.08"'+'}'+']'+'}';
        string JsonBody='[\n'+
                '{\n'+
                    '"billId": "64fe8c72be1ae0125246d285", \n'+
                    '"accountName": "Account 0",\n'+
                    '"balance": "$376.08"\n'+
                 '}\n'+
                ']\n';
           
          
		res.setBody(
			JsonBody
		);
		return res;
	}
}