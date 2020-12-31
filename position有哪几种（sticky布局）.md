# position有哪几种

## static：

静态布局，默认的属性值；在标准文档流中，不受top、bottom、left、right属性影响



## relative：

相对布局；相对的对象是position不为static父级元素，

受top、bottom、left、right属性影响，只改变自身的位置，在文档流原先的位置遗留空白区域

在标准文档流中，



## absolute

绝对布局，脱离文档流的布局，遗留下来的空间由后面的元素填充，基准也是父级元素中position不为

static的元素，（或者html元素）



## flxed

固定布局：布局相对的元素是窗口（类似于绝对布局），不随滚动条的滚动而滚动，（导航栏，回到顶部按钮）



## sticky

粘性布局； 

粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。 它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。 元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。 这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

**通俗来说，粘性布局就是当页面滚动超出目标区域的时候，会固定在一个位置，表现的和fixed布局一样，这个界限通过top，bottom，left，right来定位，（滑动导航栏，当滑动超过一定区域的时候，会固定在顶部或固定区域）**