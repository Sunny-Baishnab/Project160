AFRAME.registerComponent('cursor-listener',{
    schema:{
        selectedItemsId:{default:'',type:'string'}
    },
    init:function(){
        this.handleMouseEnterEvents()
        this.handleMouseLeaveEvents()
        this.handleClickEvents()
    },
    handlePlacesListState:function(){
        const id = this.el.getAttribute('id')
        const placesId = ['garden','main_gate','home']
        if(placesId.includes(id)){
            const placesContainer = document.querySelector('#placesContainer')
            placesContainer.setAttribute('cursor-listener',{
                selectedItemsId:id
            })
            this.el.setAttribute('material',{color:'blue',opacity:1})
        }
    },
    handleMouseEnterEvents:function(){
        this.el.addEventListener('mouseenter',()=>{
            this.handlePlacesListState()
        })
    },
    handleMouseLeaveEvents:function(){
        this.el.addEventListener('mouseleave',()=>{
            const {selectedItemsId} = this.data
            if(selectedItemsId){
                const element = document.querySelector(`#${selectedItemsId}`)
                const id = element.getAttribute('id')
                if(id == selectedItemsId){
                    element.setAttribute('material',{
                        color:'yellow',opacity:1
                    })
                }
            }
        })
    },
    handleClickEvents:function(){
        this.el.addEventListener('click',()=>{
            const placesContainer = document.querySelector('#placesContainer')
            const {state} = placesContainer.getAttribute('tour')
            if(state === 'places-list'){
                const id = this.el.getAttribute('id')
                const placesId = ['garden','main_gate','home']
                if(placesId.includes(id)){
                    placesContainer.setAttribute('tour',{
                        state:'view',
                        selectedCard:id
                    })
                }
            }
        })
    },
})