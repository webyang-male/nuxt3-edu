//获取产品信息
export function useGetGoodsInfoApi(id,type="course"){
    return useHttpGet("",`/goods/read?type=${type}&id=${id}`,{
        lazy:true
    })
}

//获取可用优惠券    /user_coupon?goods_id=6&type=course&page=1
export function useGetUseableUserCouponApi(id,type="course"){
    return useHttpGet("GetUseableUserCoupon",`/user_coupon?goods_id=${id}&type=${type}&page=1`)
}

//创建订单
export function useCreateOrderApi(body){
    return useHttpPost("CreateOrder",`/order/save`,{
        body
    })
}