// Activity images mapping
import sleepImg from '../assets/activities/sleep.png';
import wakeUpImg from '../assets/activities/wake-up.png';
import prayerImg from '../assets/activities/prayer.png';
import readQuranImg from '../assets/activities/read-quran.png';
import learnArabicImg from '../assets/activities/learn-arabic.png';
import warehouseWorkImg from '../assets/activities/warehouse-work.png';
import preparePcsImg from '../assets/activities/prepare-pcs.png';
import homeOfficeImg from '../assets/activities/home-office.png';
import benchPressImg from '../assets/activities/bench-press.png';
import squatImg from '../assets/activities/squat.png';
import cardioImg from '../assets/activities/cardio.png';
import theoryLessonImg from '../assets/activities/theory-lesson.png';
import drivingLessonImg from '../assets/activities/driving-lesson.png';

// Map activity IDs to their images
export const activityImages: Record<string, string> = {
  // Bedroom
  sleep: sleepImg,
  wake_up: wakeUpImg,

  // Prayer Room
  pray_fajr: prayerImg,
  pray_dhuhr: prayerImg,
  pray_asr: prayerImg,
  pray_maghrib: prayerImg,
  pray_isha: prayerImg,
  read_quran: readQuranImg,
  learn_arabic: learnArabicImg,

  // Warehouse
  process_orders: warehouseWorkImg,
  coordinate_staff: warehouseWorkImg,
  prepare_pcs: preparePcsImg,

  // Home Office
  optimize_ads: homeOfficeImg,
  manage_shopify: homeOfficeImg,
  accounting: homeOfficeImg,
  strategy: homeOfficeImg,

  // Gym
  bench_press: benchPressImg,
  squat: squatImg,
  cardio: cardioImg,
  full_body: squatImg,

  // Driving School
  theory_lesson: theoryLessonImg,
  driving_lesson: drivingLessonImg,
};

export function getActivityImage(activityId: string): string | null {
  return activityImages[activityId] || null;
}
