\c comment_system_db

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  password VARCHAR
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  post_title_string VARCHAR(100),
  post_title TEXT,
  post_image TEXT,
  post_author TEXT,
  category VARCHAR,
  post_time_of TEXT,
  post_hype_count INTEGER,
  post_comment_count VARCHAR(20),
  post_subtitle TEXT,
  post_content TEXT,
  image_credit VARCHAR
);


INSERT INTO posts (post_title_string, post_title, post_image, post_author, category, post_time_of, post_hype_count, post_comment_count, post_subtitle, post_content, image_credit)
VALUES (
  'NikeLab 21M Set to Host “EXTRA CREDIT” for “TEN ICONS” by Virgil Abloh',
  '<div><h2 class="post_title">NikeLab 21M Set to Host “EXTRA CREDIT” for “TEN ICONS” by Virgil Abloh</h2></div>',
  '<img class="post_image" src="images/blogImages/virgil_abloh_sneakers.jpg" />',
  'Matt Peng',
  'Footwear',
  '10 minutes ago',
  '967',
  '1 Comment',
  'A custom sneaker Experience',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="images/blogImages/virgil_abloh_sneakers.jpg" /><p class="blog_text">With <a href="https://hypebeast.com/tags/virgil-abloh">Virgil Abloh</a>‘s “<a href="https://hypebeast.com/2017/8/virgil-abloh-nike-off-campus-nyc-event-list">OFF CAMPUS</a>” alongside <a href="https://hypebeast.com/tags/nike">Nike</a> set to start tomorrow at 23 Wall Street, NikeLab 21M in SoHo dropped word of a sneaker customization experience taking place during the same time frame. Dubbed “EXTRA CREDIT,” those lucky enough to grab a spot already on Nike+ — capacity has been filled — will have the chance to purchase clean all-white Air Force 1s, Air Max 90s and Air Prestos and leave them for a specific time frame up to 48 hours. When you pick them up, “they will no longer be plain white,” is what the event summary says.</p>
<p class="blog_text">Running from September 6-8 just like “OFF CAMPUS,” this activation by Nike is a pleasant surprise. You can check out the image from the Swoosh above and <a href="https://hypebeast.com/2017/9/virgil-abloh-nike-ten-icons-reconstructed-release-info">learn how to pick up the Nike “TEN ICONS RECONSTRUCTED” by Virgil Abloh</a>.</p></div>',
'Nike'
),
(
  'Hanes Is Giving You a Chance to Meet Michael Jordan',
  '<div><h2 class="post_title">Hanes Is Giving You a Chance to Meet Michael Jordan</h2></div>',
  '<img class="post_image" src="images/blogImages/michael_jordan.jpg" />',
  'Bigoa Machar',
  'Sports',
  '54 minutes ago ',
  '471',
  '2 comments',
  'Don’t miss out on this once in a lifetime opportunity.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="images/blogImages/michael_jordan.jpg" /><p class="blog_text">From exhibiting excellence on the court to creating one of the world’s largest sneaker brands, <a href="https://hypebeast.com/tags/michael-jordan">Michael Jordan</a> has solidified himself as one of the largest names in modern culture. With a fanbase in the millions that stretches all across the world, <a href="https://hypebeast.com/tags/hanes">Hanes</a> is giving four lucky fans the opportunity to hang out with His Airness. Open to all U.S. residents over the age of 21, the contest gives the winner and three friends an all expenses paid trip to Charlotte, NC where they’ll spend the day with Jordan himself. Activities included a quick round of golf and courtside seats to a Charlotte Hornets game.</p><p class="blog_text">The contest is open from now until October 31, so head over to the <a href="http://haneschilllikemjsweepstakes.com/">Hanes website</a> for your chance to win.</p></div>',
  'Associated Press'
),
(
  'Opening Ceremony Celebrates 15-Years Strong With Limited-Edition Varsity Jacket',
  '<div><h2 class="post_title">Opening Ceremony Celebrates 15-Years Strong With Limited-Edition Varsity Jacket</h2></div>',
  '<img class="post_image" src="images/blogImages/opening_ceremony_manakin.jpg" />',
  'Austin Boykins',
  'Fashion',
  '54 minutes ago',
  '1202',
  '4 Comments',
  'A must for the varsity selection.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="images/blogImages/opening_ceremony_manakin.jpg" /><p>Opening Ceremony is commemorating its 15-year anniversary with a limited edition varsity jacket that recalls the essence of the retailer’s best moments. The limited edition color-blocked outerwear piece sports an assortment of celebratory patches with leather sleeves and a sturdy wool body.</p><p>Opening Ceremony’s 15-year anniversary jacket is currently available via its official website for a retail price of $595 USD. Get a closer look at the piece above and let us know your thoughts.</p><p>In other fashion-related news, Helmut Lang has just dropped the first installment of its “Re-Edition” collection.</p></div>',
  'OPENING CEREMONY'
),
(
  'Our Legacy Looks Back at Its 12-Year History in New Book',
  '<div><h2 class="post_title">Our Legacy Looks Back at Its 12-Year History in New Book</h2></div>',
  '<img class="post_image" src="images/blogImages/our_legacy_book.jpg" />',
  'Jack Stanley',
  'Fashion',
  '54 minutes ago',
  '584',
  '1 Comment',
  'Featuring studio images, a collection of essays, and more.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="our_legacy_book.jpg" /><p>Over the past 12 years, Swedish label <a href="https://hypebeast.com/tags/our-legacy">Our Legacy</a> has made a name for itself through collections that mix high-end minimalism with experimental touches. The brand has now unveiled a limited-edition book that will examine the its history through a series of questions about the brand and its collections. These questions include “how are these first garments perceived today, and how do they correlate with current collections more progressive take on menswear?” and “how can the brand’s “legacy” be understood in a world that is so different than what it was then?”</p><p>Other features in the book, named Self_Titled: A Book About Our Legacy, include archive pieces, studio images, and a series of essays on everything from masculinity, to the story behind the brand’s name. Priced at £55 GBP (approximately $72 USD), the book is available now from the brands <a href="https://www.ourlegacy.se/product/self_titled-a-book-about-our-legacy">webstore</a>, but you’ll have to move quickly as the first run is limited to just 1,000 copies.</p><p>To mark the launch of the book, the brand’s co-founder <a href="https://hypebeast.com/tags/jockum-hallin">Jockum Hallin</a> sat down with Vogue. You can read some key excerpts from that interview below, and head over to the publication’s <a href="http://www.vogue.com/article/our-legacy-20th-anniversary-book">site</a> to check out the whole thing.</p><h4 class="sectiom_heading">On the brands name:</h4><p>“It came from the idea that we were taking the legacy of previous generations and adapting it to our times and our lives. Along the way, we found our own language, and people started to categorize us, put us in a corner. So around 2012 we decided to take a break; we wanted to be freer to do what we want and not just what people expected us to. We took a year off and reinvented ourselves, and things have been amazing since. We took a more progressive approach, pushed ourselves forward, saw what we can really do.”</p><h4>On the brands current influences:</h4><p>“Both <a href="https://hypebeast.com/tags/christopher-nying">Christopher [Nying</a>, co-founder and creative director] and I became who we are during the ‘90s, so the subcultural things that we were into back then are slowly seeping into the collections.</p><h4>On the book:</h4><p>“We didn’t want the book to feel like a retrospective. We don’t want people to categorize us; people won’t know if something is from 2017 or 1997. There are things that you can get really dig into and get lost in; there are detail shots in the books, really funny personal things—old boots, Pez dispensers. If someone doesn’t know us too well, or our history, or our clothes, they’ll see our world straight away.</p><p>Refresh your memory of recent Our Legacy drops, including the brand’s <a href="https://hypebeast.com/2017/6/our-legacy-objects-collection">Objects collection</a> and the <a href="https://hypebeast.com/2017/4/our-legacy-splash-collection">latest release through its Splash diffusion line</a>.</p></div>',
  ''
),
(
  'Sharpen Your Photography Skills This Weekend with Kosten and Darren Burton at UBIQ in Philadelphia',
  '<div><h2 class="post_title">Sharpen Your Photography Skills This Weekend with Kosten and Darren Burton at UBIQ in Philadelphia</h2></div>',
  '<img class="post_image" src="images/blogImages/sharpen_your_photography.jpg" />',
  'Clarks Originals',
  'Arts',
  '54 minutes ago',
  '830',
  '1 comment',
  'In a hands-on workshop about shooting and editing.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="" /><p>New York-based shooter <a href="https://www.instagram.com/kosten/">Kosten</a> and Philly local <a href="https://www.instagram.com/darrenburton_/?hl=en">Darren Burton</a> will host a photography workshop at famed sneaker boutique <a href="https://hypebeast.com/tags/ubiq">UBIQ</a> in Philadelphia this Saturday, September 9. In partnership with <a href="https://hypebeast.com/tags/clarks-originals">Clarks Originals</a>, the sneaker purveyor will give 50 lucky aspiring photographers a chance to work with the pros learning about each of their signature styles. Starting out inside UBIQ x Clarks’ pop-up space, Kosten and Burton will take attendees through the process of location scouting, shooting a subject and editing snaps, before leaving the shop on a photowalk — honing their skills and helping to kickstart their own exploration in the realm of photography.</p><p>For a chance to get into the workshop, and learn how to shoot and edit like a pro, RSVP to the link <a href="https://ubiqworkshop.splashthat.com/">here</a>. Successful RSVPs will be contacted via email in the days preceding the event. If chosen, please remember to bring your camera to the workshop.</p></div>',
  '<div><span>PHOTOGRAPHER<span><span> KOSTEN<span></div>'
),
(
  'Virgil Abloh x Nike’s “The Ten” Commands the Spotlight of This Week’s Sneaker Drops',
  '<div><h2 class="post_title">Virgil Abloh x Nike’s “The Ten” Commands the Spotlight of This Week’s Sneaker Drops</h2></div>',
  '<img class="post_image" src="images/blogImages/virgil_10_commands.jpg" />',
  'Austin Boykins',
  'Footwear',
  '54 minutes ago',
  '800',
  '1 Comment',
  'Let the sneaker Gods be with you.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="" /><p>Once upon a time, Nike, adidas and other sneaker brands would bless us with releases of coveted sneakers once or twice a month. Nowadays, it’s not uncommon for different footwear labels to drop multiple pairs of heat in just one weekend. Making it easier for you to choose whether to cop or drop, we continue our weekly roundup of the silhouettes that will be sought after this week. Check out the list below and chime in on the styles you’ll be picking up.</p></div>',
  '<div><span>IMAGE CREDIT<span><span> NIKE<span></div>'
),
(
  'This Leaked Video Offers a First Look at a Working Apple iPhone 8',
  '<div><h2 class="post_title">This Leaked Video Offers a First Look at a Working Apple iPhone 8</h2></div>',
  '<img class="post_image" src="images/blogImages/iphone_8.jpg" />',
  'Nicolaus Li',
  'Tech',
  '54 minutes ago',
  '80',
  '1 Comment',
  'Is this the real deal?',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="iphone_8.jpg" /><p>With Apple’s iPhone 8 keynote just eight days, we recently received a first look at a working version of the tech company’s upcoming flagship device. After months of leaks and dummy phones, we already have a pretty good idea of what the iPhone 8 is going to look like, but until today there hasn’t been any info regarding how the phone will function.</p><p>In the leaked video, we get a relatively clear look at the new bezel-less screen which looks to feature an impressive 18:9 aspect ratio. But the most interesting part of the video is a look at how Apple is building its iOS around the polarizing notch cutout which houses the speaker, front-facing camera and sensors. The video reveals the cellular, WiFi and battery status indicators will be moving to the right of the notch while the in dash time will move to the left. Take a first look at a working Apple iPhone 8 here or below and let us know what you think.</p><p>Also, take a look at the some of the designs and features of the Apple iPhone 8 that were confirmed in the latest model leak.</p></div>',
  '<div><span>IMAGE CREDIT<span><span> PIERRICK PICHAUREAUX/@LE.PICH<span></div>'
)
-- (
--   '','<div><h2 class="post_title"></h2></div>',
--   '<img class="post_image" src="images/blogImages/" />',
--   '',
--   '',
--   '54 minutes ago',
--   '800',
--   '1 Comment',
--   '<div class="blog_text_content"><img class="blog_banner blog_images" src="" /><p></p><p></p></div>',
--   ''
-- ),
-- (
--   '','<div><h2 class="post_title"></h2></div>',
--   '<img class="post_image" src="images/blogImages/" />',
--   '',
--   '',
--   '54 minutes ago',
--   '800',
--   '1 Comment',
--   '<div class="blog_text_content"><img class="blog_banner blog_images" src="" /><p></p><p></p></div>',
--   ''
-- ),
-- (
--   '','<div><h2 class="post_title"></h2></div>',
--   '<img class="post_image" src="images/blogImages/" />',
--   '',
--   '',
--   '54 minutes ago',
--   '800',
--   '1 Comment',
--   '<div class="blog_text_content"><img class="blog_banner blog_images" src="" /><p></p><p></p></div>',
--   ''
-- ),
