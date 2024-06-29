<template>
    <div>
        <div class="px-5 pb-5">
            <h4>精彩评论</h4>
        </div>

        <LoadingGroup :pending="pending" :error="error" :is-empty="rows.length === 0">
            
            <CommentList v-for="(item,index) in rows" :key="index" :item="item"
            @commentSuccess="handleCommentSuccess">
                <CommentList v-for="(item2,index2) in item.post_comments" :key="index2" :item="item2" @commentSuccess="handleCommentSuccess"/>
            </CommentList>

            <div class="flex justify-center items-center mt-5 mb-10">
                <n-pagination size="large" :page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange"/>
            </div>
        </LoadingGroup>

    </div>
</template>
<script setup>
    import {
        NPagination
    } from "naive-ui"

    const props = defineProps(["post_id"])
    const page = ref(1)
    const limit = ref(5)

    const {
        total,
        rows,
        pending,
        error,
        refresh
    } = await usePage(()=> {
        return usePostCommentApi(()=>{
            return {
                limit:limit.value,
                page:page.value,
                post_id:props.post_id
            }
        })
    })

    console.log(rows)

    // 分页
    function handlePageChange(p){
        page.value = p
        refresh()
    }

    function handleCommentSuccess(){
        console.log("回复成功")
        refresh()
    }

    defineExpose({
        handlePageChange
    })

</script>