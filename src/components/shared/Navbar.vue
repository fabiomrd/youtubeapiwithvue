<template>  
  <header class="mdl-layout__header cor-topo">
        <div class="nav-top">
            <div class="mdl-layout__header-row">
                   
                    <div class="mdl-layout-spacer"></div>

                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                                mdl-textfield--floating-label mdl-textfield--align-right">
                    <label class="mdl-button mdl-js-button mdl-button--icon"
                        for="fixed-header-drawer-exp">

                        <slot name="icon">
                        </slot>

                    </label>
                <div class="mdl-textfield__expandable-holder">

                        <slot name="top">
                        </slot>
        </div>
         Menu
            <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">menu</i>
            </button>

            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">
                <slot name="bottom">
                </slot>
            </ul>
      </div>
    </div>
        </div>
  </header>
  </template>

<script>
    export default {
        props: ['video']
    }
</script>

<style lang="scss" scoped>
     @import '../../assets/css/Navbar.scss';  
</style>