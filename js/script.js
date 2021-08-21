(function() {
    // panel component

    var panel = {
        props: ['step', 'title', 'action', 'bnext'],
        template: `<div :data-step="step" v-if="$parent.current_step==step" class="vue-panel card">	  	
		<div class="card-body">
			<div v-if="title">
		    	<h5 class="text-center">{{title}}</h5>
		    	<hr>
			</div>
		    <slot></slot>
		    <hr>
		    <div class="d-flex justify-content-center">
		    	<button type="button" class="btn btn-secondary mr-1" v-if="isBack" v-on:click="back">Back</button>
			    <button type="button" class="btn btn-primary" v-on:click="next">{{next_text}}</button>
			</div>
		</div>		
	  </div>`,
        data: function() {
            return {
                isBack: (this.step == 1) ? false : true,
                next_text: (this.bnext) ? this.bnext : "Next",
            }
        },
        methods: {
            next: async function() {
                if (this.action) {
                    if (await this.$parent[this.action]()) {
                        if (this.$parent.current_step == this.$parent.total_step) {
                            this.$parent.step_finish();
                        } else {
                            this.$parent.current_step++;
                        }
                    }
                } else {
                    if (this.$parent.current_step == this.$parent.total_step) {
                        this.$parent.step_finish();
                    } else {
                        this.$parent.current_step++;
                    }
                }
            },
            back: function() {
                this.$parent.current_step--
            }
        },
        created:function(){
        	this.$parent.total_step++;
        }
    }


    var app = new Vue({
        el: "#app",
        data: {
            msg: "Hello Vue Wizard",
            current_step: 1, // do not remove
            total_step: 0, // do not remove
        },
        components: {
            Panel: panel // do not remove
        },
        methods: {
            say: function() {
                console.log('say awasome');
                return true;
            },

            // step_finish will execute as the last step next function
            // do not remove
            step_finish: function() {
                console.log("Last step");
                this.current_step = 1;               
            }
        },
        
    });
})()