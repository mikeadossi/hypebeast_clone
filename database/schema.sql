\c comment_system_db

DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS google_users CASCADE;
DROP TABLE IF EXISTS facebook_users CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS all_users CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

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

CREATE TABLE google_users (
  id SERIAL PRIMARY KEY,
  profile_id NUMERIC,
  username VARCHAR
);

CREATE TABLE facebook_users (
  id SERIAL PRIMARY KEY,
  profile_id NUMERIC,
  username VARCHAR
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  password VARCHAR
);

CREATE TABLE all_users (
  id SERIAL PRIMARY KEY,
  avatar TEXT,
  google_users_id INTEGER REFERENCES google_users(id),
  facebook_users_id INTEGER REFERENCES facebook_users(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  user_name TEXT,
  post_id INTEGER,
  comment_text TEXT
);

INSERT INTO posts (post_title_string, post_title, post_image, post_author, category, post_time_of, post_hype_count, post_comment_count, post_subtitle, post_content, image_credit)
VALUES (
  'Tesla Extends Range of Cars for Free to Help Owners Escape Hurricane Irma',
  '<div><h2 class="post_title">Tesla Extends Range of Cars for Free to Help Owners Escape Hurricane Irma</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/tesla_cockpit.jpg" />',
  'Joanna Fu',
  'Automotive',
  '10 minutes ago',
  '736',
  '2 Comment',
  'Every little bit helps.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/tesla_cockpit.jpg" /><p >Millions of people are evacuating Florida as Hurricane Irma buckles down on the state. According to Electrek, Tesla has temporarily extended the range of some of its cars to help owners evacuate the area, remotely unlocking the full battery pack capacity of Model S/X 60/60D vehicles through their over-the-air software system.</p>
<p >Originally, Tesla owners could purchase a vehicle with a 75 kWh battery that was software-locked to 60 kWh range for a lower price. Owners of said battery package could lift restrictions with an added fee between $4,500 and $9,000 USD. However, in the midst of the current natural crisis, Tesla has lifted the restriction for owners who had not done so in Florida, extending the capacity with an extra 30 or 40 miles of range. This came to light after a few owners reported that their cars had more range than usual this morning.</p><p >Tesla has confirmed that the electric automaker has put in place the emergency measure to temporarily extend the range of vehicles of Tesla owners in the path of Hurricane Irma.</p><p >Here’s how you can help hurricane Irma victims: American Red Cross, Habitat for Humanity’s Hurrican Recovery and donation page, Airbnb, National Voluntary Organizations Active in Disaster, Volunteer Florida.</p></div>',
'<div><span>IMAGE CREDIT</span><span> TESLA</span></div>'
),
(
  'adidas Just Jumped Over the Jumpman, Is Now #2 Sneaker Brand in U.S.',
  '<div><h2 class="post_title">adidas Just Jumped Over the Jumpman, Is Now #2 Sneaker Brand in U.S.</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/over_jumpman_post_img.jpg" />',
  'Matt Peng',
  'Footwear',
  '10 minutes ago',
  '20980',
  '28 Comments',
  '‘Ye called it.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/over_jumpman_post_img.jpg" /><p>We’ve reported on the impressive growth of German sneaker company adidas multiple times already this year, but not even the $5 billion USD in sales forecast comes close to the news unveiled today by NDP Group’s Matt Powell. Announced within a series of footwear-related tweets, Powell not only announced further sales growth for the Three Stripes but also confirmed that adidas has overtaken Jordan as the #2 brand in the United States for sports footwear, an achievement he never thought he would see in his lifetime.</p>
<p>Arguably Kanye West’s biggest critic and an avid believer that the “Kanye Effect” doesn’t play a large role in adidas’s growth, Powell highlights the Tubular Shadow and Superstar as August’s top sellers for adi. We’ll have to wait until the holiday season for the YEEZY BOOST 350 V2 “Beluga 2.0″ to see whether or not everything holds true but for now, we can play The Life of Pablo‘s “Facts (Charlie Heat Version)” and say “Yeezy, Yeezy, Yeezy just jumped over Jumpman.”</p><img class="img_position_left" src="/images/hypebeast_images/blogImages/over_jumpman_twitter.png" /></div>',
'<div><span>IMAGE CREDIT</span><span> STEVE RUSSELL/GETTY (LEAD IMAGE)
</span></div>'
),
(
  'Hanes Is Giving You a Chance to Meet Michael Jordan',
  '<div><h2 class="post_title">Hanes Is Giving You a Chance to Meet Michael Jordan</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/michael_jordan.jpg" />',
  'Bigoa Machar',
  'Sports',
  '54 minutes ago ',
  '471',
  '2 comments',
  'Don’t miss out on this once in a lifetime opportunity.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/michael_jordan.jpg" /><p >From exhibiting excellence on the court to creating one of the world’s largest sneaker brands, <a href="https://hypebeast.com/tags/michael-jordan">Michael Jordan</a> has solidified himself as one of the largest names in modern culture. With a fanbase in the millions that stretches all across the world, <a href="https://hypebeast.com/tags/hanes">Hanes</a> is giving four lucky fans the opportunity to hang out with His Airness. Open to all U.S. residents over the age of 21, the contest gives the winner and three friends an all expenses paid trip to Charlotte, NC where they’ll spend the day with Jordan himself. Activities included a quick round of golf and courtside seats to a Charlotte Hornets game.</p><p >The contest is open from now until October 31, so head over to the <a href="http://haneschilllikemjsweepstakes.com/">Hanes website</a> for your chance to win.</p></div>',
  '<div><span>IMAGE CREDIT</span><span> Associated Press</span></div>'
),
(
  'Opening Ceremony Celebrates 15-Years Strong With Limited-Edition Varsity Jacket',
  '<div><h2 class="post_title">Opening Ceremony Celebrates 15-Years Strong With Limited-Edition Varsity Jacket</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/opening_ceremony_manakin.jpg" />',
  'Austin Boykins',
  'Fashion',
  '54 minutes ago',
  '1202',
  '4 Comments',
  'A must for the varsity selection.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/opening_ceremony_manakin.jpg" /><p>Opening Ceremony is commemorating its 15-year anniversary with a limited edition varsity jacket that recalls the essence of the retailer’s best moments. The limited edition color-blocked outerwear piece sports an assortment of celebratory patches with leather sleeves and a sturdy wool body.</p><p>Opening Ceremony’s 15-year anniversary jacket is currently available via its official website for a retail price of $595 USD. Get a closer look at the piece above and let us know your thoughts.</p><p>In other fashion-related news, Helmut Lang has just dropped the first installment of its “Re-Edition” collection.</p></div>',
  '<div><span>IMAGE CREDIT</span><span> OPENING CEREMONY</span></div>'
),
(
  'Our Legacy Looks Back at Its 12-Year History in New Book',
  '<div><h2 class="post_title">Our Legacy Looks Back at Its 12-Year History in New Book</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/our_legacy_book.jpg" />',
  'Jack Stanley',
  'Fashion',
  '54 minutes ago',
  '584',
  '1 Comment',
  'Featuring studio images, a collection of essays, and more.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/our_legacy_book.jpg" /><p>Over the past 12 years, Swedish label <a href="https://hypebeast.com/tags/our-legacy">Our Legacy</a> has made a name for itself through collections that mix high-end minimalism with experimental touches. The brand has now unveiled a limited-edition book that will examine the its history through a series of questions about the brand and its collections. These questions include “how are these first garments perceived today, and how do they correlate with current collections more progressive take on menswear?” and “how can the brand’s “legacy” be understood in a world that is so different than what it was then?”</p><p>Other features in the book, named Self_Titled: A Book About Our Legacy, include archive pieces, studio images, and a series of essays on everything from masculinity, to the story behind the brand’s name. Priced at £55 GBP (approximately $72 USD), the book is available now from the brands <a href="https://www.ourlegacy.se/product/self_titled-a-book-about-our-legacy">webstore</a>, but you’ll have to move quickly as the first run is limited to just 1,000 copies.</p><p>To mark the launch of the book, the brand’s co-founder <a href="https://hypebeast.com/tags/jockum-hallin">Jockum Hallin</a> sat down with Vogue. You can read some key excerpts from that interview below, and head over to the publication’s <a href="http://www.vogue.com/article/our-legacy-20th-anniversary-book">site</a> to check out the whole thing.</p><h4 class="sectiom_heading">On the brands name:</h4><p>“It came from the idea that we were taking the legacy of previous generations and adapting it to our times and our lives. Along the way, we found our own language, and people started to categorize us, put us in a corner. So around 2012 we decided to take a break; we wanted to be freer to do what we want and not just what people expected us to. We took a year off and reinvented ourselves, and things have been amazing since. We took a more progressive approach, pushed ourselves forward, saw what we can really do.”</p><h4>On the brands current influences:</h4><p>“Both <a href="https://hypebeast.com/tags/christopher-nying">Christopher [Nying</a>, co-founder and creative director] and I became who we are during the ‘90s, so the subcultural things that we were into back then are slowly seeping into the collections.</p><h4>On the book:</h4><p>“We didn’t want the book to feel like a retrospective. We don’t want people to categorize us; people won’t know if something is from 2017 or 1997. There are things that you can get really dig into and get lost in; there are detail shots in the books, really funny personal things—old boots, Pez dispensers. If someone doesn’t know us too well, or our history, or our clothes, they’ll see our world straight away.</p><p>Refresh your memory of recent Our Legacy drops, including the brand’s <a href="https://hypebeast.com/2017/6/our-legacy-objects-collection">Objects collection</a> and the <a href="https://hypebeast.com/2017/4/our-legacy-splash-collection">latest release through its Splash diffusion line</a>.</p></div>',
  ''
),
(
  'Sharpen Your Photography Skills This Weekend with Kosten and Darren Burton at UBIQ in Philadelphia',
  '<div><h2 class="post_title">Sharpen Your Photography Skills This Weekend with Kosten and Darren Burton at UBIQ in Philadelphia</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/sharpen_your_photography.jpg" />',
  'Clarks Originals',
  'Arts',
  '54 minutes ago',
  '830',
  '1 comment',
  'In a hands-on workshop.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/sharpen_your_photography.jpg" /><p>New York-based shooter <a href="https://www.instagram.com/kosten/">Kosten</a> and Philly local <a href="https://www.instagram.com/darrenburton_/?hl=en">Darren Burton</a> will host a photography workshop at famed sneaker boutique <a href="https://hypebeast.com/tags/ubiq">UBIQ</a> in Philadelphia this Saturday, September 9. In partnership with <a href="https://hypebeast.com/tags/clarks-originals">Clarks Originals</a>, the sneaker purveyor will give 50 lucky aspiring photographers a chance to work with the pros learning about each of their signature styles. Starting out inside UBIQ x Clarks’ pop-up space, Kosten and Burton will take attendees through the process of location scouting, shooting a subject and editing snaps, before leaving the shop on a photowalk — honing their skills and helping to kickstart their own exploration in the realm of photography.</p><p>For a chance to get into the workshop, and learn how to shoot and edit like a pro, RSVP to the link <a href="https://ubiqworkshop.splashthat.com/">here</a>. Successful RSVPs will be contacted via email in the days preceding the event. If chosen, please remember to bring your camera to the workshop.</p></div>',
  '<div><span>PHOTOGRAPHER</span><span> KOSTEN</span></div>'
),
(
  'Virgil Abloh x Nike’s “The Ten” Commands the Spotlight of This Week’s Sneaker Drops',
  '<div><h2 class="post_title">Virgil Abloh x Nike’s “The Ten” Commands the Spotlight of This Week’s Sneaker Drops</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/virgil_10_commands.jpg" />',
  'Austin Boykins',
  'Footwear',
  '54 minutes ago',
  '800',
  '1 Comment',
  'Let the sneaker Gods be with you.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/virgil_10_commands.jpg" /><p>Once upon a time, Nike, adidas and other sneaker brands would bless us with releases of coveted sneakers once or twice a month. Nowadays, it’s not uncommon for different footwear labels to drop multiple pairs of heat in just one weekend. Making it easier for you to choose whether to cop or drop, we continue our weekly roundup of the silhouettes that will be sought after this week. Check out the list below and chime in on the styles you’ll be picking up.</p></div>',
  '<div><span>IMAGE CREDIT</span><span> NIKE</span></div>'
),
(
  'This Leaked Video Offers a First Look at a Working Apple iPhone 8',
  '<div><h2 class="post_title">This Leaked Video Offers a First Look at a Working Apple iPhone 8</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/iphone_8.jpg" />',
  'Nicolaus Li',
  'Tech',
  '54 minutes ago',
  '80',
  '1 Comment',
  'Is this the real deal?',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/iphone_8.jpg" /><p>With Apple’s iPhone 8 keynote just eight days, we recently received a first look at a working version of the tech company’s upcoming flagship device. After months of leaks and dummy phones, we already have a pretty good idea of what the iPhone 8 is going to look like, but until today there hasn’t been any info regarding how the phone will function.</p><p>In the leaked video, we get a relatively clear look at the new bezel-less screen which looks to feature an impressive 18:9 aspect ratio. But the most interesting part of the video is a look at how Apple is building its iOS around the polarizing notch cutout which houses the speaker, front-facing camera and sensors. The video reveals the cellular, WiFi and battery status indicators will be moving to the right of the notch while the in dash time will move to the left. Take a first look at a working Apple iPhone 8 here or below and let us know what you think.</p><p>Also, take a look at the some of the designs and features of the Apple iPhone 8 that were confirmed in the latest model leak.</p></div>',
  '<div><span>IMAGE CREDIT</span><span> PIERRICK PICHAUREAUX/@LE.PICH</span></div>'
),
(
  'Nate Diaz Slams Conor McGregor & the UFC Over Mayweather Loss',
  '<div><h2 class="post_title">Nate Diaz Slams Conor McGregor & the UFC Over Mayweather Loss</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/nate_diaz_mcgregor.jpg" />',
  'Mallory Chin',
  'Sports',
  '54 minutes ago',
  '1008',
  '1 Comment',
  'Will this lead to a third meeting in the Octagon?',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/nate_diaz_mcgregor.jpg" /><p>Though the big fight between Conor McGregor and Floyd Mayweather has come and gone, attention on superfighter McGregor remains largely active. Though many MMA fighters — and fans alike — highly-praised McGregor for stepping into the boxing ring to fight one of today’s best boxers, McGregor’s rivalry Nate Diaz had very different sentiments on his mind.</p><p>Taking to his personal Instagram, Diaz took shots at both McGregor and the UFC for the bout.</p><p></p><p>“He punched himself out the same way he lost in the UFC. No learning going on. #Overpromotion bullshit, get off the nuts this the shit I’m talking about, Bruce Lee would’ve never lost like that. #RealNinjaShit”</p><p>Diaz’s jab most likely also stems from the fact that McGregor — whose stamina has been of question — couldn’t keep up with Mayweather, resulting in the referee calling a stop to the fight in Round 10. With all this animosity still left in the air between the pair, will we be seeing McGregor and Diaz heading back into the Octagon for a third time?</p><p>Head over to our Floyd Mayweather vs. Conor McGregor fight life feed to relive one of the most-talked about sporting events in history.</p></div>',
  '<div><span>PHOTOGRAPHER<span/><span> ESTHER LIN</span></div>'
),
(
  'A New Michael Jackson Album Has Been Announced',
  '<div><h2 class="post_title">A New Michael Jackson Album Has Been Announced</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/king_of_pop.jpg" />',
  'Patrick Montes',
  'Music',
  '54 minutes ago',
  '11143',
  '11 Comment',
  'Listen to its lead single here.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/king_of_pop.jpg" /><p>The <a href="https://hypebeast.com/tags/michael-jackson">Michael Jackson</a> estate and Epic/Sony Records have revealed plans for the first Michael Jackson studio album, Scream, since 2014′s posthumous Xscape LP. Billed as the “perfect collection of 13 all-time electrifying dance classics and fan favorites,” Scream serves as a lean career retrospective of some of the King of Pop’s greatest recorded moments.
</p><p>Along with the previously-released records featured on Scream, the full-length will also produce an all-new Michael Jackson composition known as “Blood On The Dance Floor x Dangerous (The White Panda Mash-Up).” That effort is a “five-song mash-up” that serves as MJ’s first new material since the 2014 Xscape campaign.</p><p>Fans can expect Michael Jackson’s Scream to arrive on September 29, while the album’s lone new offering, “Blood On The Dance Floor x Dangerous (The White Panda Mash-Up),” can be streamed above.</p><p>Last month, Michael Jackson’s legendary Thriller album once again made history, securing <a href="https://hypebeast.com/2017/8/michael-jackson-thriller-300-weeks-billboard-200-chart">300 weeks on the Billboard 200 chart</a>.</p></div>',
  '<div><span>IMAGE CREDIT<span/><span> MICHAEL JACKSON ESCAPE/EPIC RECORDS<span/></div>'
),
(
  'The xx Make Justin Timberlake’s ‘My Love’ Their Own in Live Cover for BBC Radio 1',
  '<div><h2 class="post_title">The xx Make Justin Timberlake’s ‘My Love’ Their Own in Live Cover for BBC Radio 1</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/the_xx.jpg" />',
  'Isaac Rouse',
  'Music',
  '54 minutes ago',
  '2573',
  '3 Comment',
  'Nobody attempted T.I.’s verse.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/the_xx.jpg" /><p>Indie collective The xx made a recent visit to BBC Radio 1‘s Live Lounge to perform its rendition of the 2006 smash hit “My Love” by Justin Timberlake. The three-piece band kept Timberlake’s verses and chorus intact but opted out of attempting T.I.‘s verse.</p><p>In its place, Oliver Sim sang a few bars of “LoveStoned,” another song from Timberlake’s classic FutureSex/LoveSounds album. Jamie xx also assembled his own rendition of Timbaland during the process. The group also played a live-in-studio version of “Dangerous,” a song from its 2017 album I See You. Watch both performances below and leave your thoughts in the comments.</p></div>',
  '<div><span>IMAGE CREDIT</span><span> MARCUS LIN FOR NOW/LIVE</span></div>'
),
(
  'This Building Provides a Celestial Space for Self-Reflection',
  '<div><h2 class="post_title">This Building Provides a Celestial Space for Self-Reflection</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/pause_building_design.jpg" />',
  'Bigoa Machar',
  'Design',
  '54 minutes ago',
  '800',
  '1 Comment',
  '“Pause” brings a unique star gazing experience to Iran.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/pause_building_design.jpg" /><p>Iran-based space “Pause” is the latest project by Amir Hossein Ashari and is designed to showcase the stars in a unique way. Constructed with large sheets of metal, the exhibit sees bricks organized in a spiral pattern. Guests are encouraged to stand in the middle of the spiral and look directly above them through the hole cut through the top of the box. Aiming straight at the sky, the hole offers viewers an unobstructed look at the stars above them.
</p><p>With the bricks acting as a barrier between the outside world and the view of the stars, “Pause” is designed to eliminate any outside distractions and encourage users to focus solely on their view through the top window. By doing this, Ashari hopes that those who enter “Pause” can take some time to relax, meditate, and realign themselves. Take a look at a few pictures above and for more breathtaking design, read up on the upcoming tour for Tokujin Yoshioka’s Prismatic Glass Tea House.</p></div>',
  '<div><span>IMAGE CREDIT</span><span> AMIR HOSSEIN ASHARI</span></div>'
),
(
  'HODINKEE Is Launching Its Own Magazine',
  '<div><h2 class="post_title">HODINKEE Is Launching Its Own Magazine</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/hodinkee_book.jpg" />',
  'Jack Stanley',
  'Fashion',
  '54 minutes ago',
  '800',
  '1 Comment',
  'Making the move from digital to print.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/hodinkee_book.jpg" /><p>Having made its name as a digital platform, New York watch publication HODINKEE has now announced that it is making the move into print with a new biannual magazine. The publication is aimed to be more of a coffee table book than a throwaway magazine, and the design is similar to the website’s minimalist aesthetic. Explaining the magazine, managing editor, Stephen Pulvirent, told Business of Fashion that it won’t be strictly watch-only, but rather “this is a more general interest men’s lifestyle magazine that is inspired by a type of person who we know to be interested in watches.”</p><p>The HODINKEE magazine will not be available on typical newsstands, but the publication will instead be sold through the website and through hospitality partners including Soho House. There’s no news yet on when the first issue will drop, so keep checking back for more information.</p><p>In other watch news, TAG Heuer has recently announced a new exhibition that will take place in 10 different countries simultaneously.</p></div>',
  '<div><span>IMAGE CREDIT</span><span> HODINKEE</span></div>'
),
(
  'Martin Shkreli Is Selling the One-Of-A-Kind Wu-Tang Clan Album on eBay',
  '<div><h2 class="post_title">Martin Shkreli Is Selling the One-Of-A-Kind Wu-Tang Clan Album on eBay</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/shkreli_sells_wutang_cd.jpg" />',
  'Isaac Rouse',
  'Music',
  '54 minutes ago',
  '800',
  '1 Comment',
  'Martin Shkreli’s villainy continues.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/shkreli_sells_wutang_cd.jpg" /><p><a href="https://hypebeast.com/2016/1/martin-shkreli-threatens-ghostface-killah">Real-life supervillain</a> and pharmaceutical executive <a href="https://hypebeast.com/tags/martin-shkreli">Martin Shkreli</a> is selling the “one of a kind” Wu-Tang Clan album <a href="https://hypebeast.com/tags/once-upon-a-time-in-shaolin">Once Upon a Time in Shaolin</a> on eBay. The album is currently bidding at $75.3k USD which originally sold for $2 million USD since it is the only copy in existence.</p><p>The auction will finish September 15, and in the item’s description ”the most hated man in the world” says his reason for selling it is to see if the world values music nearly as much as he does. It also comes with a disclaimer saying he may cancel the sale at any time or may even break it in frustration.</p><p>Half the proceeds will be donated to medical research with Shkreli noting he doesn’t need to sell the album to raise money since his company has “record amounts of cash on hand.” Shkreli and Wu-Tang have had bad blood since he acquired the album, with member Ghostface Killah calling the former a “shithead” and the latter threatening to erase Ghostface Killah’s contributions on the album. <a href="http://www.ebay.com/itm/132319745117">Check out the listing</a> and leave your thoughts in the comments below.</p></div>',
  '<div><span>IMAGE CREDIT</span><span> THE BILLIONS</span></div>'
),
(
  'Capcom Celebrates ‘Street Fighter II’s 30th Anniversary by Re-Releasing the SNES Version',
  '<div><h2 class="post_title">Capcom Celebrates ‘Street Fighter II’s 30th Anniversary by Re-Releasing the SNES Version</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/streetfighter_anniversary.jpg" />',
  'Staff',
  'Entertainment',
  '54 minutes ago',
  '800',
  '1 Comment',
  'Limited to a print run of 5,500 copies.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/streetfighter_anniversary.jpg" /><p>In celebration of the franchise’s 30th anniversary, iam8bit and <a href="https://hypebeast.com/tags/capcom">Capcom</a> have teamed up to release a 1990s special edition of <a href="https://hypebeast.com/tags/street-fighter-2">Street Fighter II: The World Warrior</a>. Limited to a print run of 5,500, the re-release comes in the form of an actual, working <a href="https://hypebeast.com/tags/super-nes">Super Nintendo cartridge</a>. According to iam8bit, the SNES cartridge will come in a new box with a tri-fold design with “glistening foil sheen, delicately embossed texture, chic spot varnish.”</p><p>Priced at $100 USD, the cartridge will be available in “Opaque Ryu Red” or “Translucent Glow-in-the-Dark Blanka Green” — the glow-in-the-dark version will be limited to 1,000 copies and distributed randomly. Shipping is expected to start sometime in November and you can stay updated for when there is more information.</p><p>Also, Philly-based sneaker boutique <a href="https://hypebeast.com/2017/7/capcom-ubiq-classic-video-game-sneaker-pack">UBIQ and Capcom released a special sneaker pack</a> inspired by iconic ’80s and ’90s video games including Street Fighter II.</p></div>',
  '<div><span>IMAGE CREDIT<span><span> IAM8BIT<span></div>'
),
(
  'Lamborghini Introduces Aggressive New Aventador S Roadster',
  '<div><h2 class="post_title">Lamborghini Introduces Aggressive New Aventador S Roadster</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/aventador_s.jpg" />',
  'Patrick Montes',
  'Automotive',
  '54 minutes ago',
  '800',
  '1 Comment',
  'Less weight but still the same power.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/aventador_s.jpg" /><p>Earlier this year, news broke concerning a <a href="https://hypebeast.com/2017/4/lamborghini-mizuno-aventador-sneaker-wave-tenjin-2">special sneaker</a> produced exclusively for the coveted <a href="https://hypebeast.com/tags/lamborghini-aventador">Lamborghini Aventador</a>. Now, the Italian luxury outfit has introduced plans for an additional entry in the Aventador family.</p><p>Following last December’s <a href="https://hypebeast.com/2016/12/lamborghini-aventador-s-coupe">unveiling of the new Aventador S Coupe</a>, <a href="https://hypebeast.com/tags/lamborghini">Lamborghini</a> has revealed plans for the Aventador S Roadster. For this latest Aventador iteration, the Italian brand employs the previously-utilized V12, giving the car 729 horsepower and 509 pound-feet of torque. Coming in at 110 pounds less than the aforementioned coupe, this S Roadster is a lighter ride as well.</p><p>Hitting the retail market at $460,257 USD, this one’s definitely on the pricier end of the luxury spectrum. You can take a look at the new Lamborghini Aventador S Roadster above.</p><p>Next up, Lamborghini is getting into the <a href="https://hypebeast.com/2017/8/lamborghini-android-phone">high-end smartphone market</a>.</p></div>',
  '<div><div><span>SOURCE<span><span> AUTOBLOG<span></div><div><span>IMAGE CREDIT<span><span> LAMBORGHINI<span></div></div>'
),
(
  'Supreme’s Blimp Floated Away Faster Than Everything Else This Week',
  '<div><h2 class="post_title">Supreme’s Blimp Floated Away Faster Than Everything Else This Week</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/supreme_blimp_img.jpg" />',
  'Matt Peng',
  'Fashion',
  '54 minutes ago',
  '800',
  '1 Comment',
  'The other fastest sellout items might surprise you.',
  '<div class="blog_text_content"><img class="blog_banner blog_images" src="/images/hypebeast_images/blogImages/supreme_blimp.jpg" /><p>Thursdays in the streetwear world have become synonymous with Supreme drops and this week the brand released its collaboration with Nike on the SB Air Force 2. However, the shoes sat — they didn’t even make the list — and once again, a lifestyle accessory sold out in a matter of seconds. Following the 20 second disappearing act of the Supreme chopstick set last week, this week’s $20 USD Supreme inflatable blimp managed to sell out even quicker, becoming unavailable after just 19 seconds.</p><p>With fall/winter quickly approaching, the other items to go rapidly were jackets, jerseys and beanies alongside the carry knife. If you’re one of the lucky few to have purchased what you wanted on the website, let us know below. Take a look at the sellout times below and stay tuned to see what Supreme will have in store for us next week. You can also browse our recap of the in-store release in London.</p><img src="/images/hypebeast_images/blogImages/supreme_stock.jpg" /></div>',
  '<div><span>IMAGE CREDIT<span><span> BEN AWIN/HYPEBEAST, SUPREME<span></div>'
),
(
  'These Mind-Melting Desserts are a Geometrical Feast for the Eyes',
  '<div><h2 class="post_title">These Mind-Melting Desserts are a Geometrical Feast for the Eyes</h2></div>',
  '<img class="post_image" src="/images/hypebeast_images/blogImages/geometrical_treat.jpg" />',
  'Karl Smith',
  'Food',
  'Sep 7, 2017',
  '800',
  '1 Comment',
  'Applying math to mouthwatering treats.',
  '<div class="blog_text_content"><div class="iframe_container"><iframe src="https://player.vimeo.com/video/232635098" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div><p>Taking a mathematical approach to food may not sound like the most exciting way of cooking to most people, but Ukrainian pastry chef Dinara Kasko has other ideas. Working with an array of artists across various disciplines, Kasko uses algorithms and 3D printing to create a real visual spectacle from her baking endeavours.</p><p>The complex math applied to producing the moulds for Kasko’s creations simulates the movements and interactions of objects in space while taking shape and variables such as gravity into account. This process creates unique and somewhat bewildering kinetic designs for the chef’s incredible tarts. Finally, linking up with artists to collaborate on the aesthetic of the final product.</p><p>Take a look at the process in the video above, and — if you’re in the mood for more food-oriented films — why not check out <a href="https://hypebeast.com/2017/8/quentin-tarantino-wes-anderson-recipe-videos">how recipe videos might look if they were made by your favorite Hollywood directors</a>.</p></div>',
  '<div><div><span>SOURCE<span><span> DESIGNBOOM<span></div><div><span>IMAGE CREDIT</span><span> DESIGNBOOM</span></div></div>'
)
-- (
--   '',
--   '<div><h2 class="post_title"></h2></div>',
--   '<img class="post_image" src="/images/hypebeast_images/blogImages/" />',
--   '',
--   '',
--   '54 minutes ago',
--   '800',
--   '1 Comment',
--   '',
--   '<div class="blog_text_content"><img class="blog_banner blog_images" src="" /><p></p><p></p></div>',
--   '<div><span><span><span> <span></div>'
-- ),
