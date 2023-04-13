
        var cx;
        var cy;
        var num = 0;
        function init() {
            
            C = document.getElementById("cw");
            for (let i = 0; i < 13; i++)
                for (let j = 0;j < 13; j++) {
                    let rid = 13*i + j;
                    const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    r.setAttribute('x',26*j);
                    r.setAttribute('y',26*i);
                    r.setAttribute('height', '26');
                    r.setAttribute('width', '26');
                    r.setAttribute('id',rid.toString());
                    r.setAttribute('stroke', 'black');
                    
                    // Check if current cell should be black
                    if ((i == 0 && [0, 1, 2, 4, 6, 8, 10, 11, 12].includes(j))
                        || (i == 1 && [0, 1, 11, 12].includes(j))
                        || (i == 2 && [0, 2, 4, 6, 8, 10, 12].includes(j))
                        || (i ==3 && [4].includes(j))
                        || (i ==4 && [0, 2, 4, 6, 8, 9, 10, 12].includes(j))
                        || (i ==5 && [6].includes(j))
                        || (i ==6 && [0, 2, 4, 5, 6, 7, 8, 10, 12].includes(j))
                        || (i == 7 && [6].includes(j))
                        || (i == 8 && [0, 2, 3, 4, 6, 8, 10, 12].includes(j))
                        || (i == 9 && [8].includes(j))
                        || (i == 10 && [0, 2, 4, 6, 8, 10, 12].includes(j))
                        || (i == 11 && [0, 1, 11, 12].includes(j))
                        || (i == 12 && [0, 1, 2, 4, 6, 8, 10, 11, 12].includes(j))
                        ) {
                        r.setAttribute('fill', 'black');
                        r.setAttribute('stroke', 'white');
                        r.setAttribute('pointer-events', 'none'); // make cell unclickable
                    } else {

                        r.setAttribute('fill', 'yellow');
                        r.setAttribute('stroke', 'black');   
                    }
                    C.appendChild(r);
                    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    t.setAttribute('x',26*j + 10);
                    t.setAttribute('y',26*i + 20);
                    t.setAttribute('font-size', 'lem');
                    t.setAttribute('id', "t" + rid.toString());

                    var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                var xmlDoc = this.responseXML;
                                var xmDoc = this.responseXML;
                                // Get all the row and column tags
                                let a = xmlDoc.getElementsByTagName("across")[0];
                                let cl = a.getElementsByTagName("clue");
                                let b = xmDoc.getElementsByTagName("updown")[0];
                                let bcl = b.getElementsByTagName("clue");
                                // console.log(cl.length);
            
        
            
                                // Assign the numbers to the cells
                                for (var k = 0; k < cl.length; k++) {
                
                                    x = cl[k].getElementsByTagName("row")[0].textContent;
                                    y = cl[k].getElementsByTagName("col")[0].textContent;
                            
                                    if(x == i && y == j){
                                        num = cl[k].getElementsByTagName("number")[0].textContent;
                                        
                                        t.innerHTML = num;
                                    }
                                    
                                }
                                for (var k = 0; k < bcl.length; k++) {
                                    w = bcl[k].getElementsByTagName("row")[0].textContent;
                                    z = bcl[k].getElementsByTagName("col")[0].textContent;
                                    
                                    if(w == i && z == j){
                                        console.log(w);
                                        console.log(z);
                                        console.log(i);
                                        console.log(j);
                                        bnum = bcl[k].getElementsByTagName("number")[0].textContent;
                                        console.log(bnum);
                                        t.innerHTML = bnum;
                                    }
                                }
                            }
                        }
                        xhttp.open("GET", "data.xml", true);
                        xhttp.send();
                    
                    C.appendChild(t);
                     
                    
                    
                }
            C.addEventListener('mousedown', position, true);
            window.addEventListener('keydown',text, true);
            
        }
        
        

        function text(e) {
            let ch = String.fromCharCode(e.keyCode);
            let b = 13*cy + cx;
            let tid = "t" + b.toString();
            let tx = document.getElementById(tid);
            let rid = b.toString();
            let rx = document.getElementById(rid);
            let rec = document.getElementById(b.toString());
            if (rec.getAttribute('fill') === 'black') {
                return;
            }
            
            tx.innerHTML = ch;
        }
       

        function position(e) {
            cx = Math.floor(e.offsetX / 26);
            cy = Math.floor(e.offsetY / 26);
            let rid = 13*cy + cx;
            let rr = rid.toString();
            //console.log(rid);
            let rec = document.getElementById(rr);
            if (rec.getAttribute('fill') != 'black') {
                rec.setAttribute('fill', 'white');
            }
            
        }
       

        function loadxmlAcross() {
            console.log('loadxmlAcross() called');
            let x = new XMLHttpRequest();
            x.onreadystatechange = function() {
                if (x.readyState == 4 && x.status == 200) {
                    processAc(x.responseXML);
                }
            };
            x.open("GET", "data.xml", true);
            x.send();
        }

        function processAc(xdoc) {
            let s = "";
            let a = xdoc.getElementsByTagName("across")[0];
            let cl = a.getElementsByTagName("clue");
            
            
            for (let i = 0; i < cl.length; i++) {
                let numtxt = cl[i].getElementsByTagName("number")[0];
                s += numtxt.childNodes[0].nodeValue + " ";
                let txt = cl[i].getElementsByTagName("text")[0];
                s += txt.childNodes[0].nodeValue + "<br>";
            }
            document.getElementById("disp").innerHTML = s;
        }
        function loadxmlUpDown() {
            console.log('loadxmlUpDown() called');
            let x = new XMLHttpRequest();
            x.onreadystatechange = function() {
                if (x.readyState == 4 && x.status == 200) {
                    process(x.responseXML);
                }
            };
            x.open("GET", "data.xml", true);
            x.send();
        }
        function process(xdoc) {
            let s = "";
            let a = xdoc.getElementsByTagName("updown")[0];
            let cl = a.getElementsByTagName("clue");
            for (let i = 0; i < cl.length; i++) {
                let numtxt = cl[i].getElementsByTagName("number")[0];
                s += numtxt.childNodes[0].nodeValue + " ";
                let txt = cl[i].getElementsByTagName("text")[0];
                s += txt.childNodes[0].nodeValue + "<br>";
            }
            document.getElementById("disp2").innerHTML = s;
        }
    