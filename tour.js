AFRAME.registerComponent('tour',{
    schema:{
        state:{type:'string',default:'places-list'},
        selectedCard:{type:'string',default:'#card1'}
    },
    init:function(){
        this.placesContainer = this.el
        this.createPlace()
    },
    tick:function(){
        const {state} = this.el.getAttribute('tour')
        if(state === 'view'){
            this.hideElement([this.placesContainer])
            this.showView()
        }
    },
    showView:function(){
        const {selectedCard} = this.data
        const skyEl = document.querySelector('#mainContainer')
        skyEl.setAttribute('material',{
            src:`./assets/360View/${selectedCard}.jpg`,
            color:'white'
        })
    },
    hideElement:function(elList){
        elList.map(el=>{
            el.setAttribute('visible',false)
        })
    },
    createPlace:function(){
        const thumbnailRef = {
            garder:{
                position:{x:20,y:-4.5,z:-5.5},
                rotation:{x:0,y:-80,z:0},
                src:'./assets/thumbnail/garden.jpg',
                title:'Garden',
                id:'garden',
            },
            main_gate:{
                position:{x:4.6,y:-5.5,z:25},
                rotation:{x:180,y:0,z:0},
                src:'./assets/thumbnail/maingate.jpg',
                title:'Main Gate',
                id:'main_gate',
            },
            home:{
                position:{x:-9,y:2,z:-10},
                rotation:{x:0,y:0,z:0},
                src:'./assets/thumbnail/home.jpg',
                title:'My Home',
                id:'home',
            },
        };

        for(var i in thumbnailRef){
            const item = thumbnailRef[i]
            const thumbnail = this.createThumbnail(item)
            const TitleEl = this.createTitleEl(item)
            thumbnail.appendChild(TitleEl)
            this.placesContainer.appendChild(thumbnail)
        }
    },
    createThumbnail:function(item){
        const entityEl = document.createElement('a-entity')
        const id = `place-${item.id}`;
        entityEl.setAttribute('visible',true)
        entityEl.setAttribute('id',id)
        entityEl.setAttribute('geometry',{
            primitive:'circle',
            radius:3
        })
        entityEl.setAttribute('position',item.position)
        entityEl.setAttribute('rotation',item.rotation)
        entityEl.setAttribute('material',{
            src:item.src,
            opacity:0.6
        })
        entityEl.setAttribute('cursor-listener',{})
        return entityEl;
    },
    createTitleEl:function(item){
        const entityEl = document.createElement('a-entity')
        entityEl.setAttribute('text',{
            font:'dejavu',
            align:'center',
            color:'black',
            width:60,
            value:item.title,
        })
        entityEl.setAttribute('position',item.position)
        entityEl.setAttribute('rotation',item.rotation)
        entityEl.setAttribute('visible',true)
        return entityEl
    }
})