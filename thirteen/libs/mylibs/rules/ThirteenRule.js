var B = function(cards){
		console.log(cards)
		var ths  = this.getTonghuashun(cards);
		var zd = this.getZhadan(cards);
		var hl = this.getHulu(cards);
		var th = this.getTonghua(cards);
		var sz = this.getShunzi(cards);
		var st = this.getSantiao(cards);
		var dz = this.getDuizi(cards);
		var ways = [[],[],[],[],[],[],[]];
		var self = this;
		
		
		
		if(ths.length){
			let c = [];
			let y = [];
			for(let p=0;p<ths.length;p++){
				y[p] = ths[p];
			}
			for(var j=0;j<cards.length;j++){
				c[j] = cards[j]
			}
			for(var i=0;i<(ths.length-1);i++){
			   		for(var m=0;m<5;m++){
			   			for(var n=0;n<5;n++){
			   				if(ths[i+1][m] == ths[i][n]){
								y.splice(i+1,1)						
			   				}
			   			}
			   		}				
			}
			
			for(let x=0;x<y.length;x++){
				c=this.cutCards(c,y[x]);
				y[x].reverse().unshift('8');
				
				ways[0].push(y[x]);
			}
			var zd1 = self.getZhadan(cards);	
			if(zd1.length){
				c = this.cutCards(c,zd1[0])
				zd1[0].unshift('7');
				ways[0].push(zd1[0])
			}
			
			var hl1 = self.getHulu(c)
			if(hl1.length){
				c = this.cutCards(c,hl1[0])
				hl1[0].unshift('6')
				ways[0].push(hl1[0])
			}
			
			var th1 = self.getTonghua(c)
			if(th1.length){
				c = self.cutCards(c,th1[0][0])
				th1[0][0].unshift('5')
				ways[0].push(th1[0][0])
			}
			var sz1 = self.getShunzi(c)
			if(sz1.length){
				c = this.cutCards(c,sz1[0][0])
				sz1[0][0].reverse().unshift('4')
				ways[0].push(sz1[0][0])
			}
			
			var st1 = self.getSantiao(c)
			if(st1.length){
				for(let i=0;i<st1.length;i++){
					c = this.cutCards(c,st1[i])
					st1[i].unshift('3')
					ways[0].push(st1[i])
				}
			}
			var dz1 = self.getDuizi(c)
			if(dz1.length){
				for(var i=0;i<dz1.length;i++){
					c = this.cutCards(c,dz1[i]);
					dz1[i].unshift('1')
					
					ways[0].push(dz1[i])
				}
				
			}
			
			switch (ways[0].length){
				case 1:
					if(ways[0][0].length == 14){
						ways[0].push(ways[0][0].splice(6,5))
						ways[0][1].unshift('5')
						ways[0].push(ways[0][0].splice(6,3))
						ways[0][2].unshift('5')
					}else if(ways[0][0].length == 11){
						ways[0].push(ways[0][0].splice(1,5))
						ways[0][1].unshift('8')
						ways[0].push(c.sort(function(a,b){return b-a}).splice(0,5))
					}else{
						ways[0].push(c.sort(function(a,b){return b-a}).splice(0,5))
						ways[0].push(c.sort(function(a,b){return b-a}).splice(0,3))
					}
					break;
				case 2:
					if(ways[0][0].length == 11){
						ways[0].push(ways[0][0].splice(1,5))
						ways[0].push(ways[0][1].splice(0,ways[0][1].length))
						ways[0].splice(1,1)
						ways[0][1].unshift('8')
						if(c.length!=0){
							ways[0][2].push(c[0])
						}
					}else{
						switch (ways[0][1][0]){
							case '7':
								ways[0][1].push(c.sort(function(a,b){return b-a}).shift())
								ways[0].push(c.sort(function(a,b){return b-a}).splice(0,5))
								break;
							case '6':	
								ways[0].push(c.sort(function(a,b){return b-a}).splice(0,3))
								break;
							case '5':	
								ways[0].push(c.sort(function(a,b){return b-a}).splice(0,3))
								break;	
							case '4':
								ways[0].push(c.sort(function(a,b){return b-a}).splice(0,3))
								break;
							case '3':
								ways[0][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
								if(c.length!=0){
									ways[0].push(c.sort(function(a,b){return b-a}).splice(0,3))
									
								}
								break;
							case '1':
								ways[0][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
								ways[0].push(c.sort(function(a,b){return b-a}).splice(0,3))
								break;
						}
					}
					break;
				case 3:
					switch (ways[0][1][0]){
						case '7':
							ways[0][1].push(c.sort(function(a,b){return b-a}).shift())
							if(c.length!=0){
								ways[0][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '6':
							if(c.length!=0){
								ways[0][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '5':
							if(c.length!=0){
								ways[0][2].push(c.sort(function(a,b){return b-a}).shift())
							}
						break;
						case '4':
							if(ways[0][2][0] == '1'){
								ways[0][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '3':
							ways[0][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							if(c.length!=0){
								ways[0][2].push(c[0])
							}
							break;
						case '1':
							ways[0][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							ways[0][2].push(c.sort(function(a,b){return b-a}).shift())
							break;
					}
					break;
				case 4:
				switch (ways[0][1][0]){
					case '7':
						ways[0][1].push(ways[0][2][1])
						ways[0][3].push(ways[0][2][2])
						ways[0].splice(2,1)
						break;
					case '6':
						if(c.length!=0){
								ways[0][2].push(c[0])
							}
						break;
					case '5':
						if(c.length!=0){
								ways[0][2].push(c[0])
							}
						break;	
					case '4':
						if(ways[0][2][0] == '1'){
							ways[0][2].push(c.sort(function(a,b){return b-a}).shift())
						}
						break;
					case '3':
						ways[0][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						if(c.length!=0){
							ways[0][2].push(c[0])
						}
						break;
					case '1':
						ways[0][1].push(ways[0][2][1],ways[0][2][2],c.sort(function(a,b){return b-a}).shift())
						ways[0][1][0] = '2'
						ways[0][3].push(c[0])
						ways[0].splice(2,1)
						break;
					}
				break;
				case 5:
					ways[0].push(ways[0][4].concat(ways[0][3].splice(1,2)).concat(ways[0][1].splice(1,1)))
					ways[0].push(ways[0][2].concat(ways[0][1].splice(1,1)))
					ways[0].splice(1,4)
					ways[0][1][0] = '2'
					break;
			}
			
			
		}
		if(zd.length){
			let c = [];
				
			for(var j=0;j<cards.length;j++){
				c[j] = cards[j]
			}
			for(let i=0;i<zd.length;i++){
				c  = this.cutCards(c,zd[i]);
				zd[i].unshift('7')
				ways[1].push(zd[i])
			}
			
			
			var hl1 = self.getHulu(c);
			if(hl1.length){
				c = this.cutCards(c,hl1[0])
				hl1[0].unshift('6')
				ways[1].push(hl1[0])
			}
			
			var th1 = self.getTonghua(c)
			if(th1.length){
				c = self.cutCards(c,th1[0][0])
				th1[0][0].unshift('5')
				ways[1].push(th1[0][0])
			}
			var sz1 = self.getShunzi(c);
			if(sz1.length){
				c = this.cutCards(c,sz1[0][0])
				sz1[0][0].reverse().unshift('4')
				ways[1].push(sz1[0][0])
			}
			
			var st1 = self.getSantiao(c)
			if(st1.length){
				for(let i=0;i<st1.length;i++){
					c = this.cutCards(c,st1[i])
					st1[i].unshift('3')
					ways[1].push(st1[i])
				}
			}
			var dz1 = self.getDuizi(c)
			if(dz1.length){
				for(var i=0;i<dz1.length;i++){
					c = this.cutCards(c,dz1[i]);
					dz1[i].unshift('1')
					ways[1].push(dz1[i])
				}
			}	
			ways[1][0].push(c.sort(function(a,b){return b-a}).shift())
			switch (ways[1].length){
				case 1:
					ways[1].push(c.sort(function(a,b){return b-a}).splice(0,5))
					ways[1].push(c.sort(function(a,b){return b-a}).splice(0,3))
					break;
				case 2:
					switch (ways[1][1][0]){
						case '7':
							ways[1][1].push(c.sort(function(a,b){return b-a}).shift())
							ways[1].push(c.sort(function(a,b){return b-a}).splice(0,3))
							break;
						case '6':
							ways[1].push(c.sort(function(a,b){return b-a}).splice(0,3))
							break;
						case '5':
							ways[1].push(c.sort(function(a,b){return b-a}).splice(0,3))
							break;
						case '4':
							ways[1].push(c.sort(function(a,b){return b-a}).splice(0,3))
							break;
						case '3':
							ways[1][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							if(c.length!=0){
								ways[1].push(c.sort(function(a,b){return b-a}).splice(0,3))
							}
							break;
						case '1':
							ways[1][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							ways[1].push(c.sort(function(a,b){return b-a}).splice(0,3))
							break;
					}
					break;
				case 3:
					switch (ways[1][1][0]){
						case '6':
							if(ways[1][2][0] == '1'){
								ways[1][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '5':
							if(ways[1][2][0] == '1'){
								ways[1][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '4':
							if(ways[1][2][0] == '1'){
								ways[1][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '3':
							ways[1][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							if(c.length!=0){
								ways[1][2].push(c[0])
							}
							break;
						case '1':
							ways[1][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							ways[1][2].push(c.sort(function(a,b){return b-a}).shift())
							break;
					}
					break;
				case 4:
				switch (ways[1][1][0]){
					case '4':
						if(ways[1][2][0] == '1'){
							ways[1][2].push(c.sort(function(a,b){return b-a}).shift())
						}
						break;
					case '3':
						ways[1][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						if(c.length!=0){
							ways[1][2].push(c[0])
						}
						break;
					case '1':
						ways[1][1].push(ways[1][2][1],ways[1][2][2],c.sort(function(a,b){return b-a}).shift())
						ways[1][1][0] = '2'
						ways[1][3].push(c[0])
						ways[1].splice(2,1)
						break;
					}
				break;
				case 5:
					ways[1].push(ways[1][4].concat(ways[1][3].splice(1,2)).concat(ways[1][1].splice(1,1)))
					ways[1].push(ways[1][2].concat(ways[1][1].splice(1,1)))
					ways[1].splice(1,4)
					ways[1][1][0] = '2'
					break;
			}
		}
		if(hl.length){
			let c = [];
				for(var j=0;j<cards.length;j++){
					c[j] = cards[j]
				}
			var allHulu = [];	
			for(let i=0;i<hl.length;i++){
				if(allHulu.length == 0){
					allHulu.push(hl[i])
				}else{
					if(hl[i][0] != allHulu[0][0] &&hl[i][3] != allHulu[0][3] ){
						allHulu.push(hl[i])
					}
				}
			}
			if(allHulu.length>2){
				allHulu = allHulu.splice(0,2)
			}
			for(let i=0;i<allHulu.length;i++){
				c = this.cutCards(c,allHulu[i])
				allHulu[i].unshift('6')
				ways[2].push(allHulu[i])
			}
			
			var th1 = self.getTonghua(c)
			if(th1.length){
				c = self.cutCards(c,th1[0][0])
				th1[0][0].unshift('5')
				ways[2].push(th1[0][0])
			}
			var sz1 = self.getShunzi(c);
			if(sz1.length){
				
				c = this.cutCards(c,sz1[0][0])
				
				sz1[0][0].reverse().unshift('4')
				ways[2].push(sz1[0][0])
			}
			
			var st1 = self.getSantiao(c)
			if(st1.length){
				for(let i=0;i<st1.length;i++){
					c = this.cutCards(c,st1[i])
					st1[i].unshift('3')
					ways[2].push(st1[i])
				}
			}
			let dz1 = self.getDuizi(c)
			if(dz1.length){
				for(var i=0;i<dz1.length;i++){
					c = this.cutCards(c,dz1[i]);
					dz1[i].unshift('1')
					ways[2].push(dz1[i])
				}
				
			}		
			switch (ways[2].length){
				case 1:
					ways[2].push(c.sort(function(a,b){return b-a}).splice(0,5))
					ways[2].push(c.sort(function(a,b){return b-a}).splice(0,3))
					break;
				case 2:
						switch (ways[2][1][0]){
							case '6':
						
							case '5':
							case '4':
								ways[2].push(c.sort(function(a,b){return b-a}).splice(0,3))
								break;
							case '3':
								ways[2][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
								if(c.length!=0){
									ways[2].push(c.sort(function(a,b){return b-a}).splice(0,3))
								}
								break;
							case '1':
								ways[2][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
								ways[2].push(c.sort(function(a,b){return b-a}).splice(0,3))
								break;
						}
					break;
				case 3:
					switch (ways[2][1][0]){
						case '6':
							if(ways[2][2][0] == '1'){
								ways[2][2].push(c.sort(function(a,b){return a-b}).shift())
							}
							break;
						case '5':
							if(ways[2][2][0] == '1'){
								ways[2][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '4':
							if(ways[2][2][0] == '1'){
								ways[2][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '3':
							ways[2][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							if(c.length!=0){
								ways[2][2].push(c[0])
							}
							break;
						case '1':
							ways[2][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							ways[2][2].push(c.sort(function(a,b){return b-a}).shift())
							break;
					}
					break;
				case 4:
				switch (ways[2][1][0]){
					case '4':
						if(ways[2][2][0] == '1'){
							ways[2][2].push(c.sort(function(a,b){return b-a}).shift())
						}
						break;
					case '3':
						ways[2][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						if(c.length!=0){
							ways[2][2].push(c[0])
						}
						break;
					case '1':
						ways[2][1].push(ways[2][2][1],ways[2][2][2],c.sort(function(a,b){return b-a}).shift())
						ways[2][1][0] = '2'
						ways[2][3].push(c[0])
						ways[2].splice(2,1)
						break;
					}
				break;
				case 5:
					ways[2].push(ways[2][4].concat(ways[2][3].splice(1,2)).concat(ways[2][1].splice(1,1)))
					ways[2].push(ways[2][2].concat(ways[2][1].splice(1,1)))
					ways[2].splice(1,4)
					ways[2][1][0] = '2'
					break;
			}
		}
		if(th.length){
			var c = [];
				
			for(var j=0;j<cards.length;j++){
				c[j] = cards[j]
			}
				c = self.cutCards(c,th[0][0])
				th[0][0].sort(function(a,b){return a-b}).reverse().unshift('5')
				
				ways[3].push(th[0][0])
				
			var sz1 = self.getShunzi(c)
			if(sz1.length){
				c = self.cutCards(c,sz1[0][0])
				sz1[0][0].reverse().unshift('4')
				ways[3].push(sz1[0][0])
			}
			
			var st1 = self.getSantiao(c)
			if(st1.length){
				for(let i=0;i<st1.length;i++){
					c = this.cutCards(c,st1[i])
					st1[i].unshift('3')
					ways[3].push(st1[i])
				}
			}
			let dz1 = self.getDuizi(c)
			if(dz1.length){
				for(var i=0;i<dz1.length;i++){
					c = this.cutCards(c,dz1[i])
					dz1[i].unshift('1')
					ways[3].push(dz1[i])
				}
			}
			switch (ways[3].length){
				case 1:
					if(ways[3][0].length == 14){
						ways[3].push(ways[3][0].splice(6,5))
						ways[3][1].unshift('5')
						ways[3].push(ways[3][0].splice(6,3))
						ways[3][2].unshift('5')
					}else if(ways[3][0].length == 11){
						ways[3].push(ways[3][0].splice(1,5))
						ways[3][1].unshift('5')
						ways[3].push(c.sort(function(a,b){return b-a}).splice(0,5))
					}else{
						ways[3].push(c.sort(function(a,b){return b-a}).splice(0,5))
						ways[3].push(c.sort(function(a,b){return b-a}).splice(0,3))
					}
					break;
				case 2:
					if(ways[3][0].length == 11){
						ways[3].push(ways[3][0].splice(5,5))
						ways[3].push(ways[3][1].splice(0,ways[3][1].length))
						ways[3].splice(1,1)
						ways[3][1].unshift('5')
						if(c.length!=0){
							ways[3][2].push(c[0])
						}
					}else{
						switch (ways[3][1][0]){
							case '4':
								ways[3].push(c.sort(function(a,b){return b-a}).splice(0,3))
								break;
							case '3':
								ways[3][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
								if(c.length!=0){
									ways[3].push(c.sort(function(a,b){return b-a}).splice(0,3))
									
								}
								break;
							case '1':
								ways[3][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
								ways[3].push(c.sort(function(a,b){return b-a}).splice(0,3))
								break;
						}
					}
					break;
				case 3:
					switch (ways[3][1][0]){
						case '4':
							if(ways[3][2][0] == '1'){
								ways[3][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '3':
							ways[3][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							if(c.length!=0){
								ways[3][2].push(c[0])
							}
							break;
						case '1':
							ways[3][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							ways[3][2].push(c.sort(function(a,b){return b-a}).shift())
							break;
					}
					break;
				case 4:
				switch (ways[3][1][0]){
					case '4':
						if(ways[3][2][0] == '1'){
							ways[3][2].push(c.sort(function(a,b){return b-a}).shift())
						}
						break;
					case '3':
						ways[3][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						if(c.length!=0){
							ways[3][2].push(c[0])
						}
						break;
					case '1':
						ways[3][1].push(ways[3][2][1],ways[3][2][2],c.sort(function(a,b){return b-a}).shift())
						ways[3][1][0] = '2'
						ways[3][3].push(c[0])
						ways[3].splice(2,1)
						break;
					}
				break;
				case 5:
					ways[3].push(ways[3][4].concat(ways[3][3].splice(1,2)).concat(ways[3][1].splice(1,1)))
					ways[3].push(ways[3][2].concat(ways[3][1].splice(1,1)))
					ways[3].splice(1,4)
					ways[3][1][0] = '2'
					break;
			}
		}
		if(sz.length){
			let c = [];

			for(var j=0;j<cards.length;j++){
				c[j] = cards[j]
			}
			c = this.cutCards(c,sz[0][0])
			console.log('sz',sz)
			if(sz[0].length){
				sz[0][0].reverse().unshift('4')
			}			
			ways[4].push(sz[0][0])
			let st1 = self.getSantiao(c)
			if(st1.length){
				for(let i=0;i<st1.length;i++){
					c = this.cutCards(c,st1[i])
					st1[i].unshift('3')
					ways[4].push(st1[i])
				}
			}
			let dz1 = self.getDuizi(c)
			if(dz1.length){
				for(var i=0;i<dz1.length;i++){
					c = this.cutCards(c,dz1[i]);
					dz1[i].unshift('1')
					ways[4].push(dz1[i])	
				}
			}
			switch (ways[4].length){
				case 1:
					if(ways[4][0].length == 14){
						ways[4].push(ways[4][0].splice(6,5))
						ways[4][1].unshift('4')
						ways[4].push(ways[4][0].splice(6,3))
						ways[4][2].unshift('4')
					}else if(ways[4][0].length == 11){
						ways[4].push(ways[4][0].splice(1,5))
						ways[4][1].unshift('4')
						ways[4].push(c.sort(function(a,b){return b-a}).splice(0,5))
					}else{				
						ways[4].push(c.sort(function(a,b){return b-a}).splice(0,5))
						ways[4].push(c.sort(function(a,b){return b-a}).splice(0,3))
					}
					
					break;
				case 2:
					if(ways[4][0].length == 11){
						ways[4].push(ways[4][0].splice(1,5))
						ways[4].push(ways[4][1].splice(0,ways[4][1].length))
						ways[4].splice(1,1);
						ways[4][1].unshift('4')
						if(c.length!=0){
							ways[4][2].push(c[0])
						}
					}else{
						if(ways[4][1][0] == '1'){
							ways[4][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							ways[4].push(c.sort(function(a,b){return b-a}).splice(0,5))
						}else{
							ways[4][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							ways[4].push(c.sort(function(a,b){return b-a}).splice(0,5))
						}
					}
					break;
				case 3:
					switch (ways[4][1][0]){
						case '4':
							if(ways[4][2][0] == '1'){
								ways[4][2].push(c.sort(function(a,b){return b-a}).shift())
							}
							break;
						case '3':
							ways[4][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							if(c.length!=0){
								ways[4][2].push(c[0])
							}
							break;
						case '1':
							ways[4][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
							ways[4][2].push(c.sort(function(a,b){return b-a}).shift())
							break;
					}
					break;
				case 4:
				switch (ways[4][1][0]){
					case '4':
						if(c.length!=0){
							ways[4][1].push(c.sort(function(a,b){return b-a}).shift())
							ways[4][1].push(ways[4][3][1])
							ways[4][2].push(ways[4][3][2])
							ways[4].pop()
						}else{
							ways[4][1].push(ways[4][3][1],ways[4][3][2])
							
							ways[4].pop()
						}
						break;
					case '3':
						ways[4][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						if(c.length!=0){
							ways[4][2].push(c[0])
						}
						break;
					case '1':
						ways[4][1].push(ways[4][2][1],ways[4][2][2],c.sort(function(a,b){return b-a}).shift())
						ways[4][1][0] = '2'
						ways[4][3].push(c[0])
						ways[4].splice(2,1)
						break;
					}
				break;
				case 5:
					ways[4].push(ways[4][4].concat(ways[4][3].splice(1,2)).concat(ways[4][1].splice(1,1)))
					ways[4].push(ways[4][2].concat(ways[4][1].splice(1,1)))
					ways[4].splice(1,4)
					ways[4][1][0] = '2'
					break;
					
			}
		}
		if(st.length){
			let c = [];
				
			for(var j=0;j<cards.length;j++){
				c[j] = cards[j]
			}
			for(let i=0;i<st.length;i++){
				c = this.cutCards(c,st[i])
				st[i].unshift('3')
				ways[5].push(st[i])
			}
			
			let dz1 = self.getDuizi(c)
			if(dz1.length){
				for(var i=0;i<dz1.length;i++){
					c = this.cutCards(c,dz1[i]);
					dz1[i].unshift('1')
					ways[5].push(dz1[i])
				}
				
			}
			switch (ways[5].length){
				case 1:
					ways[5][0].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
					ways[5].push([c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift()])
					ways[5].push(c.sort());
					break;
				case 2:
					if(ways[5][1][0] == '3'){
						ways[5][0].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5].push(c.sort());
					}else{
						ways[5][0].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5].push(c.sort());				
					}
					break;
				case 3:
					if(ways[5][1][0] == '3'&&ways[5][2][0] !='3'){
						ways[5][0].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5][2].push(c.sort(function(a,b){return b-a}).shift())		
					}else if(ways[5][2][0] =='3'){
						ways[5][0].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
					}else{
						ways[5][0].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5][2].push(c.sort(function(a,b){return b-a}).shift())						
					}
					break;
				case 4:
					if(ways[5][1][0] == '3'&&ways[5][2][0] !='3'){
						ways[5][0].push(ways[5][2][1],ways[5][2][2])
						ways[5][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5][3].push(c.sort(function(a,b){return b-a}).shift())
						ways[5].splice(2,1)
					}else if(ways[5][2][0] =='3'){
						ways[5][0].push(ways[5][3][1],ways[5][3][2])
						ways[5][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
						ways[5].splice(3,1)
					}else{
						ways[5].push(ways[5][0].concat(ways[5][1].splice(1,2)))
						ways[5].push(ways[5][3].concat(ways[5][2].splice(1,2)).concat(c.sort(function(a,b){return b-a}).shift()))
						ways[5].push(c.sort());
						ways[5].splice(0,4)
						ways[5][1][0] = '2'							
					}			
					break;
				case 5:
					if(ways[5][1][0] == '3'&&ways[5][2][0] !='3'){
						ways[5][0].push(ways[5][2][1],ways[5][2][2])
						ways[5][1].push(ways[5][3][1],ways[5][3][2])
						ways[5][4].push(c.sort(function(a,b){return b-a}).shift())		
						ways[5].splice(2,2)
					}else if(ways[5][2][0] =='3'){
						ways[5][0].push(ways[5][3][1],ways[5][3][2])
						ways[5][1].push(ways[5][4][1],ways[5][4][2])
						ways[5].splice(3,2)
					}else{
						ways[5].push(ways[5][0].concat(ways[5][1].splice(1,2)))
						ways[5].push(ways[5][4].concat(ways[5][3].splice(1,2)).concat(c.sort(function(a,b){return b-a}).shift()))
						ways[5].push(ways[5][2].concat(c.sort(function(a,b){return b-a}).shift()));
						ways[5].splice(0,5)
						ways[5][1][0] = '2'						
					}										

					break;
				case 6:
					
					ways[5].unshift('liudui')
					break;
			}	
		}
		if(dz.length){
			let c = [];
				
			for(var j=0;j<cards.length;j++){
				c[j] = cards[j]
			}
			for(var i=0;i<dz.length;i++){
				c = this.cutCards(c,dz[i]);
				dz[i].unshift('1')
				ways[6].push(dz[i])
			}
			switch (ways[6].length){
				case 1:
					ways[6][0].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
					ways[6].push([c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift()])
					ways[6].reverse();
					ways[6].push(c.sort());
					break;
				case 2:
					ways[6][0].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
					ways[6][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
					
					ways[6].push(c.sort());
					
					break;
				case 3:
					
					ways[6][0].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
					ways[6][1].push(c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift(),c.sort(function(a,b){return b-a}).shift())
					ways[6][2].push(c.sort(function(a,b){return b-a}).shift())
					
					break;
				case 4:
					ways[6].push(ways[6][3].concat(ways[6][0].splice(1,2)).concat(c.sort(function(a,b){return b-a}).shift()))
					ways[6].push(ways[6][2].concat(ways[6][1].splice(1,2)).concat(c.sort(function(a,b){return b-a}).shift()))
					ways[6].splice(0,4)
					
					ways[6].push(c.sort())
					
					
					ways[6][0][0] = ways[6][1][0] = '2'
					break;
				case 5:
					ways[6].push(ways[6][3].concat(ways[6][0].splice(1,2)).concat(c.sort(function(a,b){return b-a}).shift()))
					ways[6].push(ways[6][2].concat(ways[6][1].splice(1,2)).concat(c.sort(function(a,b){return b-a}).shift()))
					ways[6].push(ways[6][4].concat(c.sort(function(a,b){return b-a}).shift()));
					ways[6].splice(0,5)
					ways[6][0][0] = ways[6][1][0] = '2'
					break;
				case 6:
					ways[6].push(ways[6][4].concat(ways[6][1].splice(1,2)).concat(ways[6][0].splice(1,1)))
					ways[6].push(ways[6][3].concat(ways[6][2].splice(1,2)).concat(ways[6][0].splice(1,1)))
					ways[6].push(ways[6][5].concat(c.shift()));
					ways[6].splice(0,6)
					ways[6][0][0] = ways[6][1][0] = '7'
					break;
			}
			
		}
		
		return ways;
		
	}

		
	B.prototype = {
			test:function(){
			    var cards = [];
			    for(var i= 0 ;i<13;i++){
			        var _temp = Math.floor( Math.random()*52);
			        cards.indexOf(_temp)<0?cards.push( _temp ):i--;
			    }
			    return cards;
			},
			getDuizi:function(cards){
			    // @params: cards 为后台发回来的牌组
			    // 长度判断，暂不做
			    var result = [];
			    var numbers = this.classifyCard(cards).numbers;
			    // 得到对子
			    numbers.forEach(function(data ,i){
			        if( data.length == 2 ){
			        // 表明有对子
			        result.push( [ data[0]+4*i ,data[1]+4*i ] );
			        }
			        if( data.length == 3 ){
			            result.push(
			                [ data[0]+4*i ,data[1]+4*i ]
			                );
			        }
			        if( data.length == 4 ){
			            result.push(
			                [ data[0]+4*i ,data[1]+4*i ]
			                );
			        }});
				return result.reverse();
			},
			// 返回三条
			getSantiao:function(cards){
			    var result = [];
			    var numbers = this.classifyCard(cards).numbers;
			    numbers.forEach(function(data,i){
			    if( data.length == 3 ){
			        result.push( [ data[0]+4*i ,data[1]+4*i ,data[2]+4*i] );
			    }
			    if( data.length == 4){
			        result.push(
			            [ data[0]+4*i ,data[1]+4*i ,data[2]+4*i]
			            )
			        }
			    })
			    return result.reverse();
			},
			// 返回顺子
			getShunzi:function(cards){
				var self  =this;
			    var result = [];
			    var numbers = this.classifyCard(cards).numbers;
			    var _tempArr = [];// [[],[i ,len ]],i前的 len 个连在一起
			    var len = 0;
			    var isA = false;
			    numbers = [numbers[12]].concat(numbers);//将A复制到前面来
			    if(numbers[0].length!=0&&numbers[1].length!=0&&numbers[2].length!=0&&numbers[3].length!=0&&numbers[4].length!=0){
			    	isA = true;
			    }
			    for(var i = 0;i<14;i++){
			        if(numbers[i].length == 0){
						
			            len > 4 ? _tempArr.push([i,len]):null;
			            len = 0;
			        }else{
			            len++;
			        }
			        if( i==13 && len > 4 ){
			            _tempArr.push([i,len]);
			        }
			    }
			    // 第一层循环，所有连成片的
			    
			    for(var i = 0 ;i<_tempArr.length; i++){
			        // 第二层，单个连片的;每次取出
			        if(_tempArr[i][1] >=10&&_tempArr[i][1]<14){
				        	
				            var _aa = _tempArr[i][0] - _tempArr[i][1] ;//记下 numbers 连续五组的起始点
				            
				            	// console.log(numbers[_aa],_aa)
					            if(isA){
					            result.push(self.combination2([
					                numbers[_aa].map(function(a,i){ 
					                	if(isA||numbers[3].length){
					                		// console.log(a)
					                		return 48+a
					                	}else{
					                		
					                		return ((_aa-1)?(_aa-1):0)*4+a
					                	}
					                }),
					                numbers[_aa+1].map(function(a,i){return (_aa)*4+a}),
					                numbers[_aa+2].map(function(a,i){return (_aa+1)*4+a}),
					                numbers[_aa+3].map(function(a,i){return (_aa+2)*4+a}),
					                numbers[_aa+4].map(function(a,i){return (_aa+3)*4+a}),
					                numbers[_aa+5].map(function(a,i){return (_aa+4)*4+a}),
					                numbers[_aa+6].map(function(a,i){return (_aa+5)*4+a}),
					                numbers[_aa+7].map(function(a,i){return (_aa+6)*4+a}),
					                numbers[_aa+8].map(function(a,i){return (_aa+7)*4+a}),
					                numbers[_aa+9].map(function(a,i){return (_aa+8)*4+a})],10));					            		
				            	}else{
					            result.push(self.combination2([
					                numbers[_aa+1].map(function(a,i){ 
					                	
					                		return (_aa)*4+a
					                	
					                }),
					                numbers[_aa+2].map(function(a,i){return (_aa+1)*4+a}),
					                numbers[_aa+3].map(function(a,i){return (_aa+2)*4+a}),
					                numbers[_aa+4].map(function(a,i){return (_aa+3)*4+a}),
					                numbers[_aa+5].map(function(a,i){return (_aa+4)*4+a}),
					                numbers[_aa+6].map(function(a,i){return (_aa+5)*4+a}),
					                numbers[_aa+7].map(function(a,i){return (_aa+6)*4+a}),
					                numbers[_aa+8].map(function(a,i){return (_aa+7)*4+a}),
					                numbers[_aa+9].map(function(a,i){return (_aa+8)*4+a}),
					                numbers[_aa+10].map(function(a,i){return (_aa+9)*4+a})],10));					            		
				            	}			            	
			        }else if(_tempArr[i][1]==14){
			        	 result.push(self.combination2([
					                numbers[1].map(function(a,i){ 					                	
					                		console.log('hah ')
					                		return a
					                	
					                }),
					                numbers[2].map(function(a,i){return (+1)*4+a}),
					                numbers[3].map(function(a,i){return (2)*4+a}),
					                numbers[4].map(function(a,i){return (3)*4+a}),
					                numbers[5].map(function(a,i){return (4)*4+a}),
					                numbers[6].map(function(a,i){return (5)*4+a}),
					                numbers[7].map(function(a,i){return (6)*4+a}),
					                numbers[8].map(function(a,i){return (7)*4+a}),
					                numbers[9].map(function(a,i){return (8)*4+a}),
					                numbers[10].map(function(a,i){return (9)*4+a}),
					                numbers[11].map(function(a,i){return (10)*4+a}),
					                numbers[12].map(function(a,i){return (11)*4+a}),
					                numbers[13].map(function(a,i){return (12)*4+a})],13));	
			        }else{
				        for(var j = 0;j<_tempArr[i][1]-4 ;j++){//每次取5个,j 表示分片起始位置
				        	
				            var _aa = _tempArr[i][0] - _tempArr[i][1] + j;//记下 numbers 连续五组的起始点
				            
				            if(numbers[_aa].length){
					            result.push(self.combination2([
					                numbers[_aa].map(function(a,i){ 
					                	if(isA){
					                		return 48+a
					                	}else{
					                		return ((_aa-1)?(_aa-1):0)*4+a
					                	}
					                }),
					                numbers[_aa+1].map(function(a,i){return (_aa)*4+a}),
					                numbers[_aa+2].map(function(a,i){return (_aa+1)*4+a}),
					                numbers[_aa+3].map(function(a,i){return (_aa+2)*4+a}),
					                numbers[_aa+4].map(function(a,i){return (_aa+3)*4+a})],5));			            	
					        }
				        }			        	
			        }

			    }
			    
			    return result;
			},
			// 返回同花
			getTonghua:function(cards){
				var self = this;
			    // [18, 29, 24, 46, 41, 45, 51, 32, 23, 11, 20, 31, 30] 无
			    // [46, 44, 35, 18, 28, 2, 34, 31, 13, 48, 22, 32, 20] 有
			    var result = [];
			    var colors = this.classifyCard(cards).colors;
			    colors.forEach(function(data,i){
			        if(data.length > 4&&data.length<10){
			            // 还原成点数
			            var _tempData = data.map(function(a){ return a*4+i ;});
			            // 排列组合 data ,并 push 到结果 result 中
			            result.push( self.combination(_tempData ,5) );
			        }else if(data.length>=10&&data.length<13){
			        	// 还原成点数
			        	
			            var _tempData = data.map(function(a){ return a*4+i ;});
			            // 排列组合 data ,并 push 到结果 result 中
			            result.push( self.combination(_tempData ,10) );
			        }else if(data.length ==13){
			        	// 还原成点数
			            var _tempData = data.map(function(a){ return a*4+i ;});
			            // 排列组合 data ,并 push 到结果 result 中
			            result.push(self.combination(_tempData ,13));
			        	
			        }
			    });
//			    console.log(result);
				return result.reverse();
			},
			// 返回葫芦
			getHulu:function(cards){
				var self  = this;
				var c = [];
				
				for(var j=0;j<cards.length;j++){
					c[j] = cards[j]
				}
			    var result = [];
			    var sanTiao = this.getSantiao(c);
			    var duizi = [];
				if(sanTiao.length>=2){
					sanTiao = sanTiao.splice(0,2);
					 duizi = this.getDuizi(self.cutCards(c,sanTiao[0].concat(sanTiao[1])));
					if(duizi.length == 0){
						
						duizi[0] = sanTiao[1].splice(0,2);
						sanTiao = sanTiao.splice(0,1)

						
					}
				}else{
					duizi = this.getDuizi(self.cutCards(c,sanTiao[0]))
				}
			    
			    var _temp = [];
			    // 如果三条和对子都存在
			   
			    if(sanTiao.length && duizi.length){
			        _temp = self.combination2([sanTiao,duizi],2);
			    }
			    for(var i=0 ;i<_temp.length ;i++){
			        if(_temp[i][0] != _temp[i][3]){
			            result.push(_temp[i]);
			            
			        }
			    }
			    return result;
			},
			// 返回炸弹
			getZhadan:function(cards){
			    var result = [];
			    var numbers = this.classifyCard(cards).numbers;
			    numbers.forEach(function(data,i){
			        if( data.length == 4){
			            result.push([ data[0]+i*4 ,data[1]+i*4 ,data[2]+i*4 ,data[3]+i*4]);
			        }
			    })
			    
			    return result;
			},
			
			// 返回同花顺
			getTonghuashun:function(cards){
			    // [46, 44, 35, 18, 33, 2, 34, 31, 13, 48, 22, 32, 20] 有
			    // [18, 29, 24, 46, 41, 45, 51, 32, 23, 11, 20, 31, 30] 无
			    var result = [];
			    // 判断是否为顺子
			    var isShunzi = function(arr){
			    	
			    // 测试成功 isShunzi([1,2,3,4,18]); isShunzi([1,2,3,4,6])
			    if(arr.length < 5){
			        // 之前的BUG 出现在这里。运行时传入的参数为 [[31,32,33,34,35]]
			        arr = arr[0];
			    }
			    var flag = true;
			    var _temp = [];
			    for(var i = 0 ; i<arr.length ;i++){
			        // _temp.push( arr[i] % 13 );
			        _temp.push( Math.floor( arr[i] / 4) );
			    }
//			    console.log(_temp)
//			    console.log("转换后的 arr ",_temp);
			    _temp.sort(function(a,b){return a-b;})
			        	.forEach(function(a,b){ a == _temp[0]+b ? null : flag=false;});
			    if(!flag){
			        if(_temp[0]==0 && _temp[1]==1 && _temp[2]==2 && _temp[3]==12 ){
			            flag = true;
			        }
			    }
//			         if( (_temp[0]+1 == _temp[1]) &&(_temp[0]+2 == _temp[2]) &&(_temp[0]+3 == _temp[3]) &&(_temp[0]+4 == _temp[4]));
//			        console.log('是否为顺子',flag);
			        return flag;
			    }
			    var self = this;
				var _tempResult = [];
			    var colors = this.classifyCard(cards).colors;
			    colors.forEach(function(data,i){
			        if(data.length > 4&&data.length<13){
			            // 还原成点数
			            var _tempData = data.map(function(a){ return a*4+i ;});
			            // 排列组合 data ,并 push 到结果 result 中
			            _tempResult.push( self.combination(_tempData ,5) );
			        }else{
			        	var _tempData = data.map(function(a){ return a*4+i ;});
			            // 排列组合 data ,并 push 到结果 result 中
			            _tempResult.push( self.combination(_tempData ,13) );
			        }
			    });
				
			   if(_tempResult[0]){
			    for(var i = 0; i< _tempResult[0].length;i++){
			        var _aa = _tempResult[0][i];
			        if( isShunzi( _aa ) ){
			            result.push( _tempResult[0][i] );
			        }
			     }
			   }			    	

			   return result.reverse();
			},
			
			// 对牌进行分类
			classifyCard:function(cards){
			    // 将牌进行排序分类
			    // color 花色
			    var colors = [
			    // "黑":[],
			    // "红":[],
			    // "梅":[],
			    // "方":[],
			    // "0":[],"1":[],"2":[],"3":[]
			    [],[],[],[]
			    ];
			    // number 点数
			    var numbers = [
			    [],[],[],[],[],[],[],[],[],[],[],[],[]
			    ];
			    // 将牌分类;
			    cards.forEach(function(card){
			        var _color = card % 4;
			        var _num = Math.floor( card / 4 );
			        colors[_color].push( _num );
			        numbers[_num].push(_color);
			    });
			
//			    console.log(colors);
//			    console.log(numbers);
			    return {"colors":colors,"numbers":numbers};
			},
			
			// 排列组合
			combination:function(arr, num){
			    var r=[];
			    (function f(t,a,n){
			        if (n==0)
			        {
			            return r.push(t);
			        }
			        for (var i=0,l=a.length; i<=l-n; i++)
			        {
			            f(t.concat(a[i]), a.slice(i+1), n-1);
			        }
			    })([],arr,num);
			    return r;
			},
			// 畸形排列组合 --- 用于找顺子后的排列，包含同一点数不同花数
			combination2:function(arr, num){
			    var r=[];
			    (function f(t,a,n)
			    {
			        if (n==0)
			        {
			            return r.push(t);
			        }
			        for (var i=0,l=a.length; i<=l-n; i++)
			        {
			            for(var j=0;j<a[i].length ;j++){
			                f(t.concat(a[i][j]), a.slice(i+1), n-1);
			            }
			        }
			
			    })([],arr,num);
			    return r;
			},
			// 将牌排序 -- 舍弃
			sortCards:function(cards){
			    var result = [];
			    // 鸽巢法
			    var allSort = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			    // 每个位置 i 代表的牌数为 (51 - i)
			    for(var i = 0 ;i<cards.length ;i++){
			        allSort[51-cards[i]] = 1;
			    }
			
			    for(var i = 0 ;i<52 ;i++){
			        if(allSort[i]){
			            result.push( 51 - i );
			        }
			    }
			    return result;
			},
			cutCards:function(cards,arr){
				if(arr){
					for(var i=0;i<arr.length;i++){
						for(var j=0;j<cards.length;j++){
							if(cards[j] == arr[i]){
								cards.splice(j,1)
							}
						}
					}
				}	
				return cards;
			}
		
		}

        module.exports = B;