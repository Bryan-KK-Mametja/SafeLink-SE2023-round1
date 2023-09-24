chrome.storage.sync.get(["url"]).then ((value) => {
	var urlToScan = value.url
	//var urlToScan = localStorage.getItem('url')
	//Getting ID
	const settings = {
	  async: true,
	  crossDomain: true,
	  url: 'https://www.virustotal.com/api/v3/urls',
	  method: 'POST',
	  headers: {
		accept: 'application/json',
		'x-apikey': '82db26ec32ebeb43c8442f0be3867bccee9d05a2958ac01cb2a135ffbe5bb922',
		'content-type': 'application/x-www-form-urlencoded'
	  },
	  data: {
		url: urlToScan
	  }
	};

	$.ajax(settings).done(function (response) {
		//var data = JSON.stringify(response)
		var id = response.data.id
		console.log(response);
		console.log(response.data.id);
		
		//Getting data
	
		const settings = {
		  async: true,
		  crossDomain: true,
		  url: `https://www.virustotal.com/api/v3/analyses/${id}`,
		  method: 'GET',
		  headers: {
			accept: 'application/json',
			'x-apikey': '82db26ec32ebeb43c8442f0be3867bccee9d05a2958ac01cb2a135ffbe5bb922'
		  }
		};

		$.ajax(settings).done(function (responseData) {
			console.log(responseData)
			console.log(responseData.data.attributes.status)
			var currstatus = (responseData.data.attributes.status)
			var state = document.getElementById('currstate')
			state.innerHTML = currstatus
			
			console.log(responseData.data.attributes.stats.harmless);
			var harmlevel = responseData.data.attributes.stats.harmless
			var harm = document.getElementById('harm')
			harm.innerHTML += `${harmlevel}/${harmlevel}`
			
			console.log(responseData.data.attributes.stats.malicious);
			var malic = responseData.data.attributes.stats.malicious
			var maliciousnous = document.getElementById('mali')
			maliciousnous.innerHTML += `${malic}/${harmlevel}`
			
			console.log(responseData.data.attributes.stats.suspicious);
			var suspi = responseData.data.attributes.stats.suspicious
			var suspiciousnous = document.getElementById('susp')
			suspiciousnous.innerHTML += `${suspi}/${harmlevel}`
			
			console.log(responseData.data.attributes.stats.timeout);
			var time = responseData.data.attributes.stats.timeout
			var timetaken = document.getElementById('time')
			timetaken.innerHTML += `${time}/${harmlevel}`
			
			console.log(responseData.data.attributes.stats.undetected);
			var detect = responseData.data.attributes.stats.undetected
			var detectId = document.getElementById('und')
			detectId.innerHTML += `${detect}/${harmlevel}`
		});
		
	});
	
	
	  
	var urlId = document.getElementById('urlSpan')
	urlId.innerHTML += urlToScan
});


