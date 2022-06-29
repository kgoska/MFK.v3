<!DOCTYPE html>
<html lang="ru">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="mfk-bank" content="width=device-width, initial-scale=1.0">
	<title>MFK</title>
</head>

<body>
	<header class="header ">
		<section class="container">
			<!-- <div class="header-section">
				<div class="logo" id="logo-head">
					<img class="logo-picture" src="../assets/img/images/logo1.png" alt="logotype" />
					<span class="logo-title">
						<p>международный <br>финансовый<br>клуб</p>
					</span>
				</div>
				<div class="about" id="about">
					<ul class="about-list">
						<li>
							<a class="about-link" href="#">О банке</a>
						</li>
						<li>
							<a class="about-link" href="#">Банковская группа</a>
						</li>
						<li>
							<a class="about-link" href="#">Новости</a>
						</li>
					</ul>
				</div>
				<div class="contacts" id="contacts">
					<a class="contacts-link" href="tel:+7495287-02-60">
						<svg class="contacts-image">
							<use href="../assets/img/svg/sprite/symbol-defs.svg#icon-phone"></use>
						</svg>
						<span class="numder-head">+7 495 287-02-60</span>
					</a>
				</div>
				<div class="header-border border-gradient-block border-gradient-color-block"></div>
				<div class="page-sector" id="corporative-head">
					<a class="pages-link" href="accountopen.html">Корпоративным клиентам</a>
				</div>
				<div class="page-sector" id="private-client-head">
					<a class="pages-link" href="contributions.html">Частным клиентам</a>
				</div>
				<div class="page-sector" id="private-banking-head">
					<a class="pages-link " href="#">Private banking</a>
				</div>
				<div class="search-box" id="search-box">
					<form class="search-form-action">
						<input class="search-form-input" type="search" placeholder="Поиск" color="white" />
						<button class="search-btn" type="button" aria-label="search">
							<svg class="search-icon">
								<use href="../assets/img/svg/sprite/symbol-defs.svg#icon-search" />
							</svg>
						</button>
					</form>
				</div>
				<button type="button" class="bank-btn" id="online-head">Онлайн - банк</button>
				<button class="menu__toggle js-open-menu" aria-expanded="false" aria-controls="mobile-menu">
					<svg class="menu__svg">
						<use href="../assets/img/svg/sprite/symbol-defs.svg#icon-menu"></use>
					</svg>
				</button>
			</div> -->
			<div class="header-menu text--white">
				<div class="header-menu__logo-wrapper">
					<div class="header-menu__logo">
						<img src="../assets/img/images/logo1.png" alt="">
					</div>
					<div class="header-menu__logo-text text--XS text--400 ">
						<span>международный финансовый клуб</span>
					</div>
				</div>
				<div class="header-menu__desktop-content-wrapper">
					<!-- <div class="header-menu__top-bar"> -->
					<div class="header-menu__top-menu">
						<div class="header-menu__top-menu-item">
							<a href="#">О банке</a>
						</div>
						<div class="header-menu__top-menu-item">
							<a href="#">Банковская группа</a>
						</div>
						<div class="header-menu__top-menu-item">
							<a href="#">Новости</a>
						</div>
					</div>
					<div class="header-menu__contacts text--400 text--M">
						<div class="header-menu__contacts-icon">
							<img src="../assets/img/svg/phone.svg" alt="">
						</div>
						<span>+ 7 495 287-02-60</span>
					</div>
					<div class="header-menu__search text--white">
						<input class="input input--underscore" type="text" placeholder="Поиск">
						<a class="header-menu__search-icon" href="">
							<img src="../assets/img/svg/search.svg" alt="">
						</a>
					</div>
					<!-- </div> -->
					<!-- <div class="header-menu__bottom-bar"> -->
					<div class="header-menu__bottom-menu text--700 text--XS text--uppercase">
						<div class="header-menu__bottom-menu-item" id='corporative-head'>
							<a href="accountopen.html">Корпоративным клиентам</a>
						</div>
						<div class="header-menu__bottom-menu-item" id='private-client-head'>
							<a href="contributions.html">Частным клиентам</a>
						</div>
						<div class="header-menu__bottom-menu-item" id='banking-head'>
							<a href="rko.html">Private banking</a>
						</div>
						<div class="header-menu__bottom-menu-underline"></div>
					</div>
					<div class="header-menu__button">
						<button>Онлайн - банк</button>
					</div>
					<!-- </div> -->
				</div>
				<div class="header-menu__burger-wrapper" id="burger-open">
					<div class="header-menu__burger"></div>
				</div>
			</div>
			<div class="mobile__container js-menu-container text--white" id="mobile-menu">
				<div class="mobile__header">
					<div class="logo-mobile">
						<img class="logo-picture" src="../assets/img/images/logo1.png" alt="logotype" />
						<span class="logo-title text--XS text--400">
							международный финансовый клуб
						</span>
					</div>
					<button class="mobile__toggle" id="burger-close">
						<svg class="mobile__svg">
							<use href="../assets/img/svg/sprite/symbol-defs.svg#icon-close-menu"></use>
						</svg>
					</button>
				</div>
				<div class="mobile__menu">
					<div class="mobile-menu__container">
						<div class class="mobile-menu__item">
							<div class="mobile-menu__item-wrap">
								<div class="mobile-menu__item-text">
									<span>Корпоративным клиентам</span>
								</div>
								<div class="mobile-menu__item-icon">
								</div>
							</div>
							<div class="mobile-menu__submenu submenu">
								<div class="submenu__body-wrap">
									<ul class="submenu__body">
										<li class="submenu__item">
											<a class="submenu__item-link" href="accountopen.html">Банковское
												обслуживание</a>
										</li>
										<li class="submenu__item">
											<a class="submenu__item-link" href="deposits.html">Депозиты</a>
										</li>
										<li class="submenu__item">
											<a class="submenu__item-link" href="credits.html">Кредитование</a>
										</li>
										<li class="submenu__item">
											<a class="submenu__item-link" href="garanty.html">Аккредитивы и
												гарантии</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="mobile-menu__item">
							<div class="mobile-menu__item-wrap">
								<div class="mobile-menu__item-text">
									<span>Частным клиентам</span>
								</div>
								<div class="mobile-menu__item-icon">
								</div>
							</div>
							<div class="mobile-menu__submenu submenu">
								<div class="submenu__body-wrap">
									<ul class="submenu__body">
										<li class="submenu__item">
											<a class="submenu__item-link" href="contributions.html">Вклады и счета</a>
										</li>
										<li class="submenu__item">
											<a class="submenu__item-link" href="cards.html">Карты</a>
										</li>
										<li class="submenu__item">
											<a class="submenu__item-link" href="online-bank.html">Онлайн-банк</a>
										</li>
										<li class="submenu__item">
											<a class="submenu__item-link" href="coins.html">Монеты и Обмен валюты</a>
										</li>
										<li class="submenu__item">
											<a class="submenu__item-link" href="safeboxes.html">Индивидуальные
												банковские ячейки</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="mobile-menu__item">
							<div class="mobile-menu__item-wrap">
								<div class="mobile-menu__item-text">
									<span>Private banking</span>
								</div>
								<div class="mobile-menu__item-icon">
								</div>
							</div>
							<div class="mobile-menu__submenu submenu">
								<div class="submenu__body-wrap">
									<ul class="submenu__body">
										<li class="submenu__item">
											<a class="submenu__item-link" href="accountopen.html">Банковское
												обслуживание</a>
										</li>
										<li class="submenu__item">
											<a class="submenu__item-link" href="credits.html">Кредитование</a>
										</li>
										<li class="submenu__item">
											<a class="submenu__item-link" href="garanty.html">Аккредитивы и
												гарантии</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<ul class="mobile__menu-list">
						<li class="mobile__menu-item border-gradient border-gradient-color">
							<a href="#" class="mobile__menu-link">Онлайн - банк</a>
						</li>
						<li class="mobile__menu-item border-gradient border-gradient-color">
							<a href="#" class="mobile__menu-link">Банковская группа</a>
						</li>
						<li class="mobile__menu-item border-gradient border-gradient-color">
							<a href="#" class="mobile__menu-link">Новости</a>
						</li>
						<li class="mobile__menu-item border-gradient border-gradient-color">
							<a href="#" class="mobile__menu-link">Поиск</a>
						</li>
						<li class="mobile__menu-item border-gradient border-gradient-color">
							<a href="#" class="mobile__menu-link">Контакты</a>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</header>