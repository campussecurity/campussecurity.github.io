/**
 * Created by suhas on 4/18/2015.
 */

WeightContainerViz = function(_widthOfWeightSel){
    this.visible = false;
    this.widthOfWeightSel = _widthOfWeightSel;
}

WeightContainerViz.prototype.showWeightsContainer = function ()
{
    if(this.visible){
        return;
    }
    this.visible = true;
    $( "#weightsSelector").show();
    $( "#weightsSelector" ).animate({
        width: this.widthOfWeightSel,
        left: "-=" +this.widthOfWeightSel
    }, 1000);
}

WeightContainerViz.prototype.hideWeightsContainer = function ()
{
    if(!this.visible){
        return;
    }

    this.visible = false;
    $( "#weightsSelector" ).animate({
        width: "-=" +this.widthOfWeightSel,
        left: "+=" +this.widthOfWeightSel
    }, 1000, function(){
        $( "#weightsSelector").hide();
    });
}

WeightContainerViz.prototype.getWeights = function(){
    var murdFactor = parseInt($("#murdId").val());
    var negligenceFactor = parseInt($("#negId").val());
    var forcibleCrimeFactor = parseInt($("#forcibId").val());
    var robberyCrimeFactor = parseInt($("#robbeId").val());
    var burglaryCrimeFactor = parseInt($("#burgId").val());
    var vehicleCrimeFactor = parseInt($("#vehicId").val());

    var aggravatedAssaultFactor =10;
    var arsonFactor =10;
    var weaponFactor =10;
    var drugFactor =10;
    var liquorFactor =10;

    var topCount = parseInt($("#topCount").val());
    var bottomCount = parseInt($("#bottomCount").val());

    return {
        murdFactor:murdFactor,
        negligenceFactor:negligenceFactor,
        forcibleCrimeFactor:forcibleCrimeFactor,
        //nonForcibleCrimeFactor:nonForcibleCrimeFactor,
        robberyCrimeFactor:robberyCrimeFactor,
        burglaryCrimeFactor:burglaryCrimeFactor,
        vehicleCrimeFactor:vehicleCrimeFactor,
        topCount:topCount,
        bottomCount:bottomCount,
        aggravatedAssaultFactor:aggravatedAssaultFactor,
        arsonFactor:arsonFactor,
        weaponFactor:weaponFactor,
        drugFactor:drugFactor,
        liquorFactor:liquorFactor
    }
}

WeightContainerViz.prototype.showSafe = function(){

    return $("#rbSafe").prop( "checked")
}