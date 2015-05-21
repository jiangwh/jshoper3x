$(function() {
	/**
	 * 删除主图片和缩略图片，采用假删除
	 */
	deleteMainPicture=function(){
		var str = "";
		var sum = 0;
		//主图片遍历
		$(":checkbox[name='mainpc']").each(function() {
			if ($(this).attr("checked")) {
				sum++;
				str += this.id + ",";
			}
		});
		//主压缩图片遍历
		$(":checkbox[name='maincompresspc']").each(function(){
			if ($(this).attr("checked")) {
				sum++;
				str += this.id + ",";
			}
		});
		if (sum == 0) {
			alert('只有在选择图片后才能删除');
			return false;
		}
		var array = new Array();
		array = str.split(",");
		$(array).each(function(k, v) {
			$("#maintriggers img").remove("img[id=" + v + "]");
			$("#maintriggers input[name='mainpc']").remove("input[id=" + v + "]");
			$("#maintriggers input[name='maincompresspc']").remove("input[id=" + v + "]");
		});
	},
	$("#maindelpc").on("click",function(){
		deleteMainPicture();
	});
	/**
	 * 删除多图片和缩略图片，采用假删除
	 */
	deletePictureList=function(){
		var str = "";
		var sum = 0;
		//主图片遍历
		$(":checkbox[name='pclist']").each(function() {
			if ($(this).attr("checked")) {
				sum++;
				str += this.id + ",";
			}
		});
		//主压缩图片遍历
		$(":checkbox[name='compresspclist']").each(function(){
			if ($(this).attr("checked")) {
				sum++;
				str += this.id + ",";
			}
		});
		if (sum == 0) {
			alert('只有在选择图片后才能删除');
			return false;
		}
		var array = new Array();
		array = str.split(",");
		$(array).each(function(k, v) {
			$("#triggers img").remove("img[id=" + v + "]");
			$("#triggers input[name='pclist']").remove("input[id=" + v + "]");
			$("#triggers input[name='compresspclist']").remove("input[id=" + v + "]");
		});
	},
	$("#delpc").on("click",function(){
		deletePictureList();
	});


	/**
	 * 获取商品类型下拉框
	 */
	findGoodsTypeTNForSelect = function() {
		$.ajax({
			url : "findGoodsTypeTNForSelect.action",
			type : "post",
			dataType : 'json',
			async : false,
			success : function(data) {
				if (data.goodstypetnlist != "") {
					var temp = "<option value='1'>通用商品类型</option>";
					$('#goodsTypeId').html(data.goodstypetnlist + temp);
				}
			}
		});
	},
	/**
	 * 读取商品一级分类
	 */
	findGoodsCategoryByGradeZeroone=function(){
		$.ajax({
			url:"findGoodsCategoryByGradeZeroone.action",
			type:"post",
			dataType:'json',
			async:false,
			success:function(data){
				if (data.sucflag) {
					var header="<option value='-1'>---请选择---</option>";
					if (data.goodscategoryzero == "") {
						$('#navid').append(header);
						$('#ltypeid').hide();
						$('#stypeid').hide();
					} else {
						$('#navid').append(header).append(data.goodscategoryzero);
						$('#ltypeid').hide();
						$('#stypeid').hide();
					}

				}
			}
		});
	},
	/**
	 * 根据传入的商品类型id获取商品属性select类型的
	 */
	findGoodsAttributeTBygoodsTypeId = function(val) {
		$.ajax({
			url:"findGoodsAttributeTBygoodsTypeId.action",
			type:"post",
			data:{"goodsTypeId":val},
			dataType:"json",
			async:false,
			success:function(data){
				if (data.sucflag) {
					$('#gat').text("");
					var gathtmlheader="<div class='well'><h4>商品属性选择区域</h4></div>";
					var gathtml = "";
					var gathtmlfooter="</div>";
					var option = "";
					var attributelist = new Array();
					var length;
					if (data.gatbeanlist != null) {
						$.each(data.gatbeanlist, function(i, item) {
							attributelist = item.attributelist.split(",");
							length=attributelist.length;
							option = "<option value='0'>---请选择---</option>";
							for ( var j = 0; j <length ; j++) {
								option += "<option value='" + attributelist[j]+ "'>" + attributelist[j] + "</option>";
							}
							gathtml += "<div class='form-inline'>"
									+ "<span class='label label-required'>"
									+ item.goodsattributename + "</span>"
									+ "<select id='goodsAttrVal" + i
									+ "' name='goodsAttrVal" + i + "'>" + option
									+ "</select>" + "</div>";
							option = "";
						});
						$('#gat').append(gathtmlheader).append(gathtml).append(gathtmlfooter).show();
					}
				}
			}
		});
		
	},
	
	/**
	 * 根据商品类型id获取商品参数列表
	 */
	findGoodsParameterBygoodsTypeId=function(val){
		$.ajax({
			url:"findGoodsParameter.action",
			type:"post",
			data:{"goodsTypeId":val},
			dataType:"json",
			async:false,
			success:function(data){
				if(data.sucflag){
					var gathtmlheader="<div class='well'><h4>商品参数填写区域</h4></div>";
					var gathtml = "";
					var gathtmlfooter="</div>";
					$('#params').text("");

					var jsonstr=$.parseJSON(data.bean.goodsParameter);
					$.each(jsonstr,function(k,s){
						gathtml += "<div class='form-inline'>"
							+ "<span class='label label-required'>"
							+ s.name + "</span>"
							+ "<input id='"+s.id+"' name='"+s.id+"' value=''  class='small' type='text' ></input>"
							+ "</div>";
					});
					$('#params').append(gathtmlheader).append(gathtml).append(gathtmlfooter).show();
				}
			}
		});
	},
	
	/**
	 * 获取所有商品品牌列表
	 */
	findAllBrandtjson=function(data){
		$.ajax({
			url:"findAllBrandtjson.action",
			type:"post",
			data:{},
			dataType:"json",
			async:false,
			success:function(data){
				if(data.sucflag){
					var header="<option value='0'>---请选择---</option>";
					$("#brandname").append(header).append(data.brandjson);
				}else{
					$("#brandname").append(header);
				}
			}
		});
	},
	/*
	 * 当商品类型被选择时调用动态加载商品属性方法和商品参数方法
	 */
	$('#goodsTypeId').change(function(){
		var goodsTypeId=$('#goodsTypeId').val();
		findGoodsAttributeTBygoodsTypeId(goodsTypeId);
		findGoodsParameterBygoodsTypeId(goodsTypeId);
	});
	/**
	 * 级联读取一级分类的二级栏目
	 */
	$('#navid').change(function() {
		var navid = $('#navid').val();
		//navid=0表示顶级分类，navid=-1表示请选择，也就是当都不是这两个条件时执行一级栏目对应的下级栏目的搜索
		//这里再读取二级分类内容
		if (navid != "0" && navid != "-1") {
			$.post("findGoodscategoryByparentId.action",{"parentId":navid}, function(data) {
				if (data.sucflag) {
					$('#ltypeid').html(data.goodscategorytwo);
				}
			});
		}
	});
	/**
	 * 级联读取二级分类对应的三级分类
	 */
	$('#ltypeid').change(function(){
		var ltypeid = $('#ltypeid').val();
		//parentid=0表示顶级分类，parentid=-1表示请选择，也就是当都不是这两个条件时执行一级栏目对应的下级栏目的搜索
		//这里再读取三级分类内容
		if (ltypeid != "0" && ltypeid != "-1") {
			$.post("findGoodscategoryStypeid.action",{"parentId":ltypeid}, function(data) {
				if (data.sucflag) {
					$('#stypeid').html(data.stypeidlist).show();
					
				}
			});
		}
	});
	
	
	/**
	 * 验证分类选择
	 */
	$("#navid").change(function() {
		var navid = $('#navid').val();
		var ltypeid = $('#ltypeid').val();
		var stypeid = $('#stypeid').val();
		if (navid == '-1') {
			$('#ltypeid').hide();
			$('#stypeid').hide();
		} else {
			$('#ltypeid').show();
		}
		if (ltypeid == "-1") {
			$('#stypeid').hide();
		}
	});

	/**
	 * 点击重新选择分类
	 */
	$("#reselectgoodscategory").toggle(function(){
	    	$("#selectgoodscategory").show();
	    	$("#goodscategory").hide();
	    }, function(){
	    	$("#selectgoodscategory").hide();
	    	$("#goodscategory").show();
	    });
	   
	
	
	
	/**
	 * 增加团购商品
	 */
	saveGoodsGroupT=function(){
		var goodsTypeId=$("#goodsTypeId").val();//商品类型id
		var goodsTypeName=$("#goodsTypeId").find("option:selected").text();//所选商品类型名称
		//这里需要调用获取商品类型属性和参数填写的值方法
		var goodsParameterValue=getGoodsParameter(goodsTypeId);
		var goodsAttrsVals=getgoodsAttrVals(goodsTypeId);
		var navid=$("#navid").val();
		if(navid=="-1"){
			formwarning("#alerterror", "请选择顶级商品分类");
			return false;
		}
		var nname=$("#navid").find("option:selected").text();
		var ltypeid=$("#ltypeid").val();
		var lname="";
		if(ltypeid=="-1"){
			ltypeid="0";
		}else{
			lname=$("#ltypeid").find("option:selected").text();
		}
		var stypeid=$("#stypeid").val();
		var sname="";
		if(stypeid=="-1"){
			stypeid="0";
		}else{
			sname=$('#stypeid').find("option:selected").text();	
		}
		var fname="";
		//团购标题
		var groupname=$("#groupname").val();
		//团购副标题
		var subgroupname=$("#subgroupname").val();
		
		var goodsname=$("#goodsname").val();
		var usersetnum=$("#usersetnum").val();
		var brandid=$("#brandname").val();
		if(brandid=="-1"){
			formwarning("#alerterror", "请选择商品品牌");
			return false;
		}
		var brandname=$("#brandname").find("option:selected").text();
		var cost=$("#cost").val();
		var saleprice=$("#saleprice").val();
		var memberprice=$("#memberprice").val();
		//团购价
		var groupprice=$("#groupprice").val();
		var price=$("#price").val();
		//团购开始时间
		var groupBeginTime=$("#groupBeginTime").val();
		//团购结束时间
		var groupEndTime=$("#groupEndTime").val();
		//商品抵扣积分额度
		var groupNeedPointsLimit=$("#groupNeedPointsLimit").val();

		var points=$("#points").val();
		//限购数量
		var limitBuy=$("#limitBuy").val();
		//浏览数量
		var readcount=$("#readcount").val();
		//评论数量
		var totalcomment=$("#totalcomment").val();
		//虚拟订单数量
		var virtualOrdersCount=$("#virtualOrdersCount").val();

		var sort=$("#sort").val();
		var isNew=$("input[name='isNew']:checked").val();
		var recommended=$("input[name='recommended']:checked").val();
		var hotsale=$("input[name='hotsale']:checked").val();
		var bargainprice=$("input[name='bargainprice']:checked").val();
		var ismobileplatformgoods=$("input[name='ismobileplatformgoods']:checked").val();
		var salestate=$("input[name='salestate']:checked").val();
		var isvirtualsale=$("input[name='isvirtualsale']:checked").val();
		var isoutsite=$("input[name='isoutsite']:checked").val();
		var outsitelink=$('#outsitelink').val();
		
		//获取商品主图原图图片路径
		var mainpicture="";
		$(":checkbox[name='mainpc']").each(function() {
			if($(this).attr("checked")){
				mainpicture=this.value;
			}
		});
		//获取商品主图缩略图图片路径
		var mainsmallpicture="";
		$(":checkbox[name='maincompresspc']").each(function() {
			if($(this).attr("checked")){
				mainsmallpicture=this.value;
			}
		});
		//获取商品原图图片路径集合
		var pictureurl="";
		$(":checkbox[name='pclist']").each(function() {
			if($(this).attr("checked")){
				pictureurl+=this.value+",";
			}
		});
		pictureurl=pictureurl.toString().substring(0, pictureurl.length-1);
		//获取缩略图图片路径集合
		var smallpictures="";
		$(":checkbox[name='compresspclist']").each(function(){
			if($(this).attr("checked")){
				smallpictures+=this.value+",";
			}
		});
		smallpictures=smallpictures.toString().substring(0, smallpictures.length-1);
		
		var detail=$('#detail').val();
		var commoditylist=$('#commoditylist').val();
		var metaKeywords=$('#metaKeywords').val();
		var metaDescription=$('#metaDes').val();
		var goodsid=$("#hidgoodsid").val();
		this.value="提交中";
		this.disabled=true;
		$.post("saveGoodsGroupT.action",{
			"isvirtualsale":isvirtualsale,
			"isoutsite":isoutsite,
			"outsitelink":outsitelink,
			"goodsTypeId":goodsTypeId,
			"goodsTypeName":goodsTypeName,
			"goodsParameterValue":goodsParameterValue,
			"goodsAttrsVals":goodsAttrsVals,
			"navid":navid,
			"nname":nname,
			"ltypeid":ltypeid,
			"lname":lname,
			"stypeid":stypeid,
			"sname":sname,
			"fname":fname,
			"goodsid":goodsid,
			"goodsname":goodsname,
			"groupBeginTime":groupBeginTime,
			"groupEndTime":groupEndTime,
			"groupNeedPointsLimit":groupNeedPointsLimit,
			"groupname":groupname,
			"groupprice":groupprice,
			"usersetnum":usersetnum,
			"brandid":brandid,
			"brandname":brandname,
			"cost":cost,
			"saleprice":saleprice,
			"memberprice":memberprice,
			"price":price,
			"points":points,
			"sort":sort,
			"isNew":isNew,
			"recommended":recommended,
			"hotsale":hotsale,
			"bargainprice":bargainprice,
			"ismobileplatformgoods":ismobileplatformgoods,
			"salestate":salestate,
			"mainPicture":mainpicture,
			"mainSmallPicture":mainsmallpicture,
			"pictures":pictureurl,
			"smallPictures":smallpictures,
			"detail":detail,
			"commoditylist":commoditylist,
			"metaKeywords":metaKeywords,
			"metaDescription":metaDescription,
			"limitBuy":limitBuy,
			"readcount":readcount,
			"subgroupname":subgroupname,
			"totalcomment":totalcomment,
			"virtualOrdersCount":virtualOrdersCount
		},function(data){
			if(data.sucflag){
				window.location.href="goodsgroupment.jsp?operate=find&folder=goods";
			}
		});
		
	},
	

	/**
	 * 更新团购商品
	 */
	updateGoodsGroup=function(){
		var isvirtualsale=$("input[name='isvirtualsale']:checked").val();
		var isoutsite=$("input[name='isoutsite']:checked").val();
		var outsitelink=$('#outsitelink').val();
		var goodsid=$("#hidgoodsid").val();
		var goodsTypeId=$("#goodsTypeId").val();//商品类型id
		var goodsTypeName=$("#goodsTypeId").find("option:selected").text();//所选商品类型名称
		//这里需要调用获取商品类型属性和参数填写的值方法
		var goodsParameterValue=getGoodsParameter(goodsTypeId);
		var goodsAttrsVals=getgoodsAttrVals(goodsTypeId);
		var navid="";
		var nname="";
		var ltypeid="";
		var lname="";
		var stypeid="";
		var sname="";
		var fname="";
		if(!$("#selectgoodscategory").is(":hidden")){
			navid=$("#navid").val();
			if(navid=="-1"){
				formwarning("#alerterror", "请选择顶级商品分类");
				return false;
			}
			nname=$("#navid").find("option:selected").text();
			ltypeid=$("#ltypeid").val();
			if(ltypeid=="-1"){
				ltypeid="0";
			}else{
				lname=$("#ltypeid").find("option:selected").text();
			}
			stypeid=$("#stypeid").val();
			if(stypeid=="-1"){
				stypeid="0";
			}else{
				sname=$('#stypeid').find("option:selected").text();	
			}
		}else{
			navid=$("#hidnavid").val();
			nname=$("#hidnname").val();
			ltypeid=$("#hidltypeid").val();
			lname=$("#hidlname").val();
			stypeid=$("#hidstypeid").val();
			sname=$("#hidsname").val();
		}
		//团购标题
		var groupname=$("#groupname").val();
		//团购副标题
		var subgroupname=$("#subgroupname").val();
		var goodsname=$("#goodsname").val();
		var usersetnum=$("#usersetnum").val();
		var brandid=$("#brandname").val();
		if(brandid=="-1"){
			formwarning("#alerterror", "请选择商品品牌");
			return false;
		}

		var brandname=$("#brandname").find("option:selected").text();
		var cost=$("#cost").val();
		var saleprice=$("#saleprice").val();
		var memberprice=$("#memberprice").val();
		//团购价
		var groupprice=$("#groupprice").val();
		var price=$("#price").val();
		//团购开始时间
		var groupBeginTime=$("#groupBeginTime").val();
		//团购结束时间
		var groupEndTime=$("#groupEndTime").val();
		//商品抵扣积分额度
		var groupNeedPointsLimit=$("#groupNeedPointsLimit").val();

		var points=$("#points").val();
		//限购数量
		var limitBuy=$("#limitBuy").val();
		//浏览数量
		var readcount=$("#readcount").val();
		//评论数量
		var totalcomment=$("#totalcomment").val();
		//虚拟订单数量
		var virtualOrdersCount=$("#virtualOrdersCount").val();

		var sort=$("#sort").val();
		var isNew=$("input[name='isNew']:checked").val();
		var recommended=$("input[name='recommended']:checked").val();
		var hotsale=$("input[name='hotsale']:checked").val();
		var bargainprice=$("input[name='bargainprice']:checked").val();
		var ismobileplatformgoods=$("input[name='ismobileplatformgoods']:checked").val();
		var salestate=$("input[name='salestate']:checked").val();
		var isvirtualsale=$("input[name='isvirtualsale']:checked").val();
		var isoutsite=$("input[name='isoutsite']:checked").val();
		var outsitelink=$('#outsitelink').val();
		
		//获取商品主图原图图片路径
		var mainpicture="";
		$(":checkbox[name='mainpc']").each(function() {
			if($(this).attr("checked")){
				mainpicture=this.value;
			}
		});
		//获取商品主图缩略图图片路径
		var mainsmallpicture="";
		$(":checkbox[name='maincompresspc']").each(function() {
			if($(this).attr("checked")){
				mainsmallpicture=this.value;
			}
		});
		//获取商品原图图片路径集合
		var pictureurl="";
		$(":checkbox[name='pclist']").each(function() {
			if($(this).attr("checked")){
				pictureurl+=this.value+",";
			}
		});
		pictureurl=pictureurl.toString().substring(0, pictureurl.length-1);
		//获取缩略图图片路径集合
		var smallpictures="";
		$(":checkbox[name='compresspclist']").each(function(){
			if($(this).attr("checked")){
				smallpictures+=this.value+",";
			}
		});
		smallpictures=smallpictures.toString().substring(0, smallpictures.length-1);
		
		var detail=$('#detail').val();
		var commoditylist=$('#commoditylist').val();
		var metaKeywords=$('#metaKeywords').val();
		var metaDescription=$('#metaDes').val();
		var goodsid=$("#hidgoodsid").val();
		var groupid=$("#hidgroupid").val();
		this.value="提交中";
		this.disabled=true;
		$.post("updateGoodsGroup.action",{
			"isvirtualsale":isvirtualsale,
			"isoutsite":isoutsite,
			"outsitelink":outsitelink,
			"goodsTypeId":goodsTypeId,
			"goodsTypeName":goodsTypeName,
			"goodsParameterValue":goodsParameterValue,
			"goodsAttrsVals":goodsAttrsVals,
			"navid":navid,
			"nname":nname,
			"ltypeid":ltypeid,
			"lname":lname,
			"stypeid":stypeid,
			"sname":sname,
			"fname":fname,
			"goodsid":goodsid,
			"goodsname":goodsname,
			"groupBeginTime":groupBeginTime,
			"groupEndTime":groupEndTime,
			"groupNeedPointsLimit":groupNeedPointsLimit,
			"groupname":groupname,
			"groupprice":groupprice,
			"usersetnum":usersetnum,
			"brandid":brandid,
			"brandname":brandname,
			"cost":cost,
			"saleprice":saleprice,
			"memberprice":memberprice,
			"price":price,
			"points":points,
			"sort":sort,
			"isNew":isNew,
			"recommended":recommended,
			"hotsale":hotsale,
			"bargainprice":bargainprice,
			"ismobileplatformgoods":ismobileplatformgoods,
			"salestate":salestate,
			"mainPicture":mainpicture,
			"mainSmallPicture":mainsmallpicture,
			"pictures":pictureurl,
			"smallPictures":smallpictures,
			"detail":detail,
			"commoditylist":commoditylist,
			"metaKeywords":metaKeywords,
			"metaDescription":metaDescription,
			"limitBuy":limitBuy,
			"readcount":readcount,
			"subgroupname":subgroupname,
			"totalcomment":totalcomment,
			"virtualOrdersCount":virtualOrdersCount,
			"groupid":groupid
		},function(data){
			if(data.sucflag){
				window.location.href="goodsgroupment.jsp?operate=find&folder=goods";
			}
		});
		
	},
	
	/**
	 * 获取30个属性值
	 */
	getgoodsAttrVals=function(goodsTypeId){
		var goodsAttrsVals="";
		if(goodsTypeId!=""){
			$("select[id^='goodsAttrVal']").each(function(){
				goodsAttrsVals+="{\"attrval\":\""+this.value+"\"},";
			});
		}
		goodsAttrsVals="["+goodsAttrsVals.toString().substring(0, goodsAttrsVals.length-1)+"]";
		return goodsAttrsVals;	
	},
	
	
	/**
	 * 从页面上获取被赋值的商品参数值
	 */
	getGoodsParameter=function(goodsTypeId){
		var goodsParameterValue="";
		if(goodsTypeId!=""){
			$("input[id^='paramlistname']").each(function(){
				goodsParameterValue+="{\"id\":\""+this.name+"\",\"value\":\""+this.value+"\"},";
			});
		}
		goodsParameterValue="["+goodsParameterValue.toString().substring(0, goodsParameterValue.length-1)+"]";
		return goodsParameterValue;
	},
	
	$("#submit").click(function(){
		saveGoodsGroupT();
	});
	
	$("#update").click(function(){
		updateGoodsGroup();
	});
	
	/**
	 * 查询团购商品的属性值并进行绑定
	 */
	findGoodsGroupAttributeRpTBygroupid=function(val){
		$.ajax({
			url:"findGoodsGroupAttributeRpTBygroupid.action",
			type:"post",
			data:{"groupid":val},
			dataType:"json",
			async:false,
			success:function(data){
				if(data.sucflag){
					$.each(data.beanlist,function(k,v){
						$('#goodsAttrVal'+k).val(v.attrval);
					});
				}
			}
		});
	},
	/**
	 * 根据goodsid获取商品详细介绍
	 */
	findGoodsGroupDetialRpTBygroupid=function(val){
		
		$.ajax({
			url:"findGoodsGroupDetialRpTBygroupid.action",
			type:"post",
			data:{"groupid":val},
			dataType:"json",
			async:false,
			success:function(data){
				if(data.sucflag){
					KE.html("detail", data.bean.detail);
				}else{
					KE.html("detail", data.bean.detail);
				}
			}
		});
	},
	
	
	/**
	 * 绑定团购商品数据
	 */
	findGoodsGroupById=function(){
		var groupid=$.query.get("groupid");
		if(groupid!=""){
			$.post("findGoodsGroupById.action",{"groupid":groupid},function(data){
				if(data.sucflag){
					//设置商品参数的值
					$("#goodsTypeId").val(data.bean.goodsTypeId);
					findGoodsParameterBygoodsTypeId(data.bean.goodsTypeId);
					var jsonstr=$.parseJSON(data.bean.goodsParameterValue);
					if(jsonstr!=null){
						$.each(jsonstr,function(k,v){
							$('#'+v.id).val(v.value);
						});
					}
					//获取商品属性的值，该值需要从商品属性关系表中获取
					findGoodsAttributeTBygoodsTypeId(data.bean.goodsTypeId);
					//绑定商品属性值
					findGoodsGroupAttributeRpTBygroupid(data.bean.groupid);
					$("#navid").val(data.bean.navid);
					$('#shownname').text(data.bean.nname);
					$('#showlname').text(data.bean.lname);
					$('#showsname').text(data.bean.sname);
					$('#shownavid').text(data.bean.navid);
					$('#showltypeid').text(data.bean.ltypeid);
					$('#showstypeid').text(data.bean.stypeid);
					$('#hidnavid').val(data.bean.navid);
					$('#hidnname').val(data.bean.nname);
					$('#hidltypeid').val(data.bean.ltypeid);
					$('#hidlname').val(data.bean.lname);
					$('#hidstypeid').val(data.bean.stypeid);
					$('#hidsname').val(data.bean.sname);
					$("#groupname").val(data.bean.groupname);
					$("#subgroupname").val(data.bean.subgroupname);
					$('#goodsname').val(data.bean.goodsname);
					$('#usersetnum').val(data.bean.usersetnum);
					$('#brandname').val(data.bean.brandid);
					$('#cost').val(data.bean.cost);
					$('#saleprice').val(data.bean.saleprice);
					$('#memberprice').val(data.bean.memberprice);
					$('#price').val(data.bean.price);
					$("#groupprice").val(data.bean.groupprice);
					$("#groupBeginTime").val(data.groupBeginTime);
					$("#groupEndTime").val(data.groupEndTime);
					$("#groupNeedPointsLimit").val(data.bean.groupNeedPointsLimit);
					$('#points').val(data.bean.points);
					$("#limitBuy").val(data.bean.limitBuy);
					$("#readcount").val(data.bean.readcount);
					$("#totalcomment").val(data.bean.totalcomment);
					$("#virtualOrdersCount").val(data.bean.virtualOrdersCount);

					$("#sort").val(data.bean.sort);
					if("1"==data.bean.isNew){
						$("input[name='isNew']").get(0).checked=true;
					}else{
						$("input[name='isNew']").get(1).checked=true;
					}
					if("1"==data.bean.recommended){
						$("input[name='recommended']").get(0).checked=true;
					}else{
						$("input[name='recommended']").get(1).checked=true;
					}					
					if("1"==data.bean.hotsale){
						$("input[name='hotsale']").get(0).checked=true;
					}else{
						$("input[name='hotsale']").get(1).checked=true;
					}
					if("1"==data.bean.bargainprice){
						$("input[name='bargainprice']").get(0).checked=true;
					}else{
						$("input[name='bargainprice']").get(1).checked=true;
					}	
					if("1"==data.bean.ismobileplatformgoods){
						$("input[name='ismobileplatformgoods']").get(0).checked=true;
					}else{
						$("input[name='ismobileplatformgoods']").get(1).checked=true;
					}
					if("1"==data.bean.salestate){
						$("input[name='salestate']").get(0).checked=true;
					}else{
						$("input[name='salstate']").get(1).checked=true;
					}
					if("1"==data.bean.isoutsite){
						$("input[name='isoutsite']").get(0).checked=true;
					}else{
						$("input[name='isoutsite']").get(1).checked=true;
					}
					$("#outsitelink").val(data.bean.outsitelink);
					if("1"===data.bean.isvirtualsale){
						$("input[name='isvirtualsale']").get(0).checked=true;
					}else{
						$("input[name='isvirtualsale']").get(1).checked=true;
					}
					//显示商品主图
					var mainPicture=data.bean.mainPicture;
					var mainPHtml="<img id='0' src='"+data.basepath+mainPicture+"'/><input id='0' name='mainpc' type='checkbox' value='"+mainPicture+"' checked/>";
					//显示商品缩略图
					var mainSmallPicture=data.bean.mainSmallPicture;
					mainPHtml+="<img id='1' src='"+data.basepath+mainSmallPicture+"'/><input id='0' name='maincompresspc' type='checkbox' value='"+mainSmallPicture+"' checked/>";
					$("#maintriggers").append(mainPHtml);

					//显示展示图集包含缩略图
					var pictureurlHtml="";
					//原图集合
					var pictureurls=data.bean.pictures;
					var pctemp=pictureurls.split(',');
					
					//缩略图集合
					var smallPictures=data.bean.smallPictures;
					var smallpctemp=smallPictures.split(',');

					$.each(pctemp,function(k,v){
						if(""==v){
							return;
						}
						pictureurlHtml+="<img id='"+v+"' src='"+data.basepath+v+"'/><input id='"+v+"' name='pclist' type='checkbox' value='"+v+"' checked/>";
						$.each(smallpctemp,function(k,v){
							if(""==v){
								return;
							}
							pictureurlHtml+="<img id='"+v+"' src='"+data.basepath+v+"'/><input id='"+v+"' name='compresspclist' type='checkbox' value='"+v+"' checked/>";				
						});
					});
					$('#triggers').append(pictureurlHtml);

					findGoodsGroupDetialRpTBygroupid(data.bean.groupid);
					
					$('#commoditylist').val(data.bean.commoditylist);
					$('#metaKeywords').val(data.bean.metaKeywords);
					$('#metaDes').val(data.bean.metaDescription);
					$("#hidgoodsid").val(data.bean.goodsid);
					$("#hidgroupid").val(data.bean.groupid);
					$("#goodscategory").show();
					$("#modifygoodscategory").show();
					$("#selectgoodscategory").hide();
					$("#submit").hide();
					$("#update").show();
				}
			});
		}
	}
	
	
	
	
	/**
	 * main logic
	 */
	var operate = $.query.get("operate");
	if (operate == "add") {
		findGoodsTypeTNForSelect();
		findGoodsCategoryByGradeZeroone();
		findAllBrandtjson();
		

	}else if(operate=="edit"){
		findGoodsTypeTNForSelect();
		findGoodsCategoryByGradeZeroone();
		findAllBrandtjson();
		findGoodsGroupById();

	}else if(operate=="find"){
		
	}
});

/**
 * flexigrid list
 */
$(function() {
	$("#goodsgroupmanagement").flexigrid({
		url : 'findAllGoodsGroupT.action',
		dataType : 'json',
		cache : false,
		colModel : [ {
			display : '团购商品名称',
			name : 'groupname',
			width : 400,
			sortable : true,
			align : 'center'
		}, {
			display : '团购价',
			name : 'groupprice',
			width : 150,
			sortable : true,
			align : 'center'
		}, {
			display : '上架',
			name : 'salestate',
			width : 60,
			sortable : true,
			align : 'center'
		}, {
			display : '新品',
			name : 'isNew',
			width : 60,
			sortable : true,
			align : 'center'
		}, {
			display : '特价',
			name : 'bargainprice',
			width : 60,
			sortable : true,
			align : 'center'
		}, {
			display : '热销',
			name : 'hotsale',
			width : 60,
			sortable : true,
			align : 'center'
		}, {
			display : '推荐',
			name : 'recommended',
			width : 60,
			sortable : true,
			align : 'center'
		},{
			display:'移动平台',
			name:'ismobileplatformgoods',
			width:60,
			sortable:true,
			align:'center'
		},{
			display : '团购开始时间',
			name : 'groupbegintime',
			width : 200,
			sortable : true,
			align : 'center'
		}, {
			display : '团购结束时间',
			name : 'groupendtime',
			width :200,
			sortable : true,
			align : 'center'
		}, {
			display : '操作',
			name : 'operating',
			width : 110,
			sortable : true,
			align : 'center'
		} ],
		buttons : [ {
			name : '添加团购商品',
			bclass : 'add',
			onpress : action
		}, {
			name : '编辑团购商品',
			bclass : 'edit',
			onpress : action
		}, {
			name : '删除',
			bclass : 'del',
			onpress : action
		}, {
			name : '上架',
			bclass : 'add',
			onpress : action
		}, {
			name : '下架',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记特价',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记热销',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记推荐',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记新品',
			bclass : 'add',
			onpress : action
		}, {
			name : '标记移动平台',
			bclass : 'add',
			onpress : action
		}, {
			name : '重置标记',
			bclass : 'add',
			onpress : action
		}, {
			separator : true
		} ],

		searchitems : [ {
			display : '请选择搜索条件',
			name : 'sc',
			isdefault : true
		}, {
			display : '商品名称',
			name : 'goodsname'
		} ],
		sortname : "createtime",
		sortorder : "desc",
		usepager : true,
		title : '',
		useRp : true,
		rp :20,
		rpOptions : [ 5, 20, 40, 100 ],
		showTableToggleBtn : true,
		showToggleBtn : true,
		width : 'auto',
		height : 'auto',
		pagestat : '显示{from}到{to}条，共{total}条记录',
		procmsg : '正在获取数据，请稍候...',
		checkbox : true
	});
	function action(com, grid) {
		if (com == '添加团购商品') {
			window.location.href = "goodsgroup.jsp?operate=add&folder=goods";
			return;

		}else if (com == '编辑团购商品') {
			if ($('.trSelected', grid).length == 1) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str = this.id.substr(3);
				});
				window.location.href = "goodsgroup.jsp?operate=edit&folder=goods&groupid="
						+ str;
				return;
			} else {
				formwarning("#alerterror", "请选择一条信息");
				return false;
			}
		}else if (com == '删除') {
			
			if ($('.trSelected', grid).length > 0) {
				var str="";
				$(".trSelected td:nth-child(1) div", $('#goodsgroupmanagement')).each(function(i){
					str+=this.innerHTML+"  ";
				});
				$("#contentp").text(str);
				$("#goodsdelModal").modal({
					keyboard:true,
					show:true,
				});
				$("#goodsbtnok").click(function(){
					var str = "";
					$('.trSelected', grid).each(function() {
						str += this.id.substr(3) + ",";
					});
					$.post("delGoodsGroup.action", {
						"groupid" : str
					}, function(data) {
						if (data.sucflag) {
							$("#goodsdelModal").modal('hide');
							$('#goodsgroupmanagement').flexReload();
							forminfo("#alertinfo", "删除团购商品成功");
						}
					});
				});
				$("#goodsbtnclose").click(function(){
					$("#goodsdelModal").modal('hide');
				});
				
			} else {
				formwarning("#alerterror", "请选择要删除的信息");
				return false;
			}
		} else if (com == '标记特价') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var bargainprice = "1";
				$.post("updateGoodsGroupbargainprice.action", {
					"groupid" : str,
					"bargainprice" : bargainprice
				}, function(data) {
					if (data.sucflag) {
						$('#goodsgroupmanagement').flexReload();
						forminfo("#alertinfo", "标记特价成功");
					}
				});

			} else {
				formwarning("#alerterror", "请选择要标记特价的信息");
				return false;
			}
		} else if (com == '标记热销') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var hotsale = "1";
				$.post("updateGoodsGrouphotsale.action", {
					"groupid" : str,
					"hotsale" : hotsale
				}, function(data) {
					if (data.sucflag) {
						$('#goodsgroupmanagement').flexReload();
						forminfo("#alertinfo", "标记热销成功");
					}
				});

			} else {
				formwarning("#alerterror", "请选择要标记热销的信息");
				return false;
			}
		} else if (com == '标记推荐') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var recommended = "1";
				$.post("updateGoodsGrouprecommend.action", {
					"groupid" : str,
					"recommended" : recommended
				}, function(data) {
					if (data.sucflag) {
						$('#goodsgroupmanagement').flexReload();
						forminfo("#alertinfo", "标记推荐成功");
					}
				});

				return;
			} else {
				formwarning("#alerterror", "请选择要标记推荐的信息");
				return false;
			}
		} else if (com == '标记新品') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var isNew = "1";
				$.post("updateGoodsGroupisnew.action", {
					"groupid" : str,
					"isNew" : isNew
				}, function(data) {
					if (data.sucflag) {
						$('#goodsgroupmanagement').flexReload();
						forminfo("#alertinfo", "标记新品成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要标记新品的信息");
				return false;
			}
		} else if (com == '标记移动平台') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var ismobileplatformgoods = "1";
				$.post("updateGoodsGroupismobileplatform.action", {
					"groupid" : str,
					"ismobileplatformgoods" : ismobileplatformgoods
				}, function(data) {
					if (data.sucflag) {
						$('#goodsgroupmanagement').flexReload();
						forminfo("#alertinfo", "标记移动平台成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要标记移动平台的信息");
				return false;
			}
		} else if (com == '重置标记') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var recommended = "0";
				var hotsale = "0";
				var bargainprice = "0";
				var isNew = "0";
				var ismobileplatformgoods = "0";
				$.post("resetGoodsGroupState.action", {
					"groupid" : str,
					"recommended" : recommended,
					"hotsale" : hotsale,
					"bargainprice" : bargainprice,
					"isNew" : isNew,
					"ismobileplatformgoods" : ismobileplatformgoods
				}, function(data) {
					if (data.sucflag) {
						$('#goodsgroupmanagement').flexReload();
						forminfo("#alertinfo", "重置标记成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要重置标记的信息");
				return false;
			}
		} else if (com == '上架') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var salestate = "1";
				$.post("updateGoodsGroupsalestate.action", {
					"groupid" : str,
					"salestate" : salestate
				}, function(data) {
					if (data.sucflag) {
						$('#goodsgroupmanagement').flexReload();
						forminfo("#alertinfo", "上架成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要上架的信息");
				return false;
			}
		} else if (com == '下架') {
			if ($('.trSelected', grid).length > 0) {
				var str = "";
				$('.trSelected', grid).each(function() {
					str += this.id.substr(3) + ",";
				});
				var salestate = "0";
				$.post("updateGoodsGroupsalestate.action", {
					"groupid" : str,
					"salestate" : salestate
				}, function(data) {
					if (data.sucflag) {
						$('#goodsgroupmanagement').flexReload();
						forminfo("#alertinfo", "下架成功");
					}
				});
				return;
			} else {
				formwarning("#alerterror", "请选择要下架的信息");
				return false;
			}

		}

	}
});