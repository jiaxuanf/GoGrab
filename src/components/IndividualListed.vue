<template>
    
    <p id='scrolly'>
    <img src="https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/1503/30661/QQ20190428230137__95937.1556517799.png?c=2" alt="Izoa">
    <img src="https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/1503/30658/QQ20190428230027__93343.1556517796.png?c=2" alt="Izoa">
    <img src="https://cdn11.bigcommerce.com/s-yrkef1j7/images/stencil/1280x1280/products/1503/30663/QQ20190428230148__69023.1556517796.png?c=2" alt="Izoa">


    </p>
</template>

<script>
export default {
  name: 'IndividualListed',
  props: {
    msg: String
  }
}
</script>
<style scoped>
#scrolly{
            height: 300px;
            width: 800px;
            overflow: auto;
            overflow-y: hidden;
            margin: 0 auto;
            white-space: nowrap
        }

img{
            width: 525px;
            height: 300px;
            margin: 20px 10px;
            display: inline;
            margin-left: 40px;
            margin-right: 40px;
        }
</style>