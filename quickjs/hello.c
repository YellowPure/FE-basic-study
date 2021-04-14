/* File generated automatically by the QuickJS compiler. */

#include "quickjs-libc.h"

const uint32_t qjsc_hello_size = 166;

const uint8_t qjsc_hello[166] = {
 0x02, 0x08, 0x10, 0x6d, 0x79, 0x53, 0x74, 0x72,
 0x69, 0x6e, 0x67, 0x12, 0x6d, 0x79, 0x53, 0x74,
 0x72, 0x69, 0x6e, 0x67, 0x32, 0x0a, 0x68, 0x65,
 0x6c, 0x6c, 0x6f, 0x0a, 0x77, 0x6f, 0x72, 0x6c,
 0x64, 0x0e, 0x63, 0x6f, 0x6e, 0x73, 0x6f, 0x6c,
 0x65, 0x06, 0x6c, 0x6f, 0x67, 0x02, 0x20, 0x10,
 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x2e, 0x6a, 0x73,
 0x0e, 0x00, 0x06, 0x00, 0xa0, 0x01, 0x00, 0x01,
 0x00, 0x07, 0x00, 0x00, 0x53, 0x01, 0xa2, 0x01,
 0x00, 0x00, 0x00, 0x3f, 0xe0, 0x00, 0x00, 0x00,
 0x80, 0x3f, 0xe1, 0x00, 0x00, 0x00, 0x80, 0x3e,
 0xe0, 0x00, 0x00, 0x00, 0x82, 0x3e, 0xe1, 0x00,
 0x00, 0x00, 0x82, 0x04, 0xe2, 0x00, 0x00, 0x00,
 0x3a, 0xe0, 0x00, 0x00, 0x00, 0x04, 0xe3, 0x00,
 0x00, 0x00, 0x3a, 0xe1, 0x00, 0x00, 0x00, 0x38,
 0xe4, 0x00, 0x00, 0x00, 0x42, 0xe5, 0x00, 0x00,
 0x00, 0xc2, 0x42, 0x5b, 0x00, 0x00, 0x00, 0x38,
 0xe0, 0x00, 0x00, 0x00, 0x04, 0xe6, 0x00, 0x00,
 0x00, 0x38, 0xe1, 0x00, 0x00, 0x00, 0x24, 0x03,
 0x00, 0x24, 0x01, 0x00, 0xce, 0x28, 0xce, 0x03,
 0x01, 0x04, 0x3d, 0x3f, 0x35, 0x36,
};

static JSContext *JS_NewCustomContext(JSRuntime *rt)
{
  JSContext *ctx = JS_NewContextRaw(rt);
  if (!ctx)
    return NULL;
  JS_AddIntrinsicBaseObjects(ctx);
  JS_AddIntrinsicDate(ctx);
  JS_AddIntrinsicEval(ctx);
  JS_AddIntrinsicStringNormalize(ctx);
  JS_AddIntrinsicRegExp(ctx);
  JS_AddIntrinsicJSON(ctx);
  JS_AddIntrinsicProxy(ctx);
  JS_AddIntrinsicMapSet(ctx);
  JS_AddIntrinsicTypedArrays(ctx);
  JS_AddIntrinsicPromise(ctx);
  JS_AddIntrinsicBigInt(ctx);
  return ctx;
}

int main(int argc, char **argv)
{
  JSRuntime *rt;
  JSContext *ctx;
  rt = JS_NewRuntime();
  js_std_set_worker_new_context_func(JS_NewCustomContext);
  js_std_init_handlers(rt);
  JS_SetModuleLoaderFunc(rt, NULL, js_module_loader, NULL);
  ctx = JS_NewCustomContext(rt);
  js_std_add_helpers(ctx, argc, argv);
  js_std_eval_binary(ctx, qjsc_hello, qjsc_hello_size, 0);
  js_std_loop(ctx);
  JS_FreeContext(ctx);
  JS_FreeRuntime(rt);
  return 0;
}
